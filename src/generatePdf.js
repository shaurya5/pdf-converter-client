import { jsPDF } from "jspdf";
import axios from "axios";
import { useEffect } from 'react'
import autoTable from 'jspdf-autotable'

/*
 * This function fetches data from backend using axios
 * Compares entries using Reference Number
 */

// TODO : What if there are multiple same reference numbers //

var data = {}

function fetchData() {
  axios.get("https://pdf-converter0.herokuapp.com/api").then((res) => {
    res.data.forEach((element) => {
      if (element.refNo === localStorage.getItem("refNo")) {
        data = element;
        console.log(data)
      }
    });
  });
}

window.addEventListener('load', fetchData())


/*
 * This function generates PDF of the quotation
 */

function generatePdf() {
  const doc = new jsPDF();
  var width = doc.internal.pageSize.getWidth()

  // Company details
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold').text("SEE LUBE TECHNOLOGIES PVT LIMITED", width/2, 20, { align: 'center' }).setFont(undefined, 'normal')
  doc.setFontSize(12)
  doc.text('CORP OFF : 30, GURU NANAK MARKET', width/2, 26, { align: 'center' })
  doc.text('FOCAL POINT, LUDHIANA 141010', width/2, 32, { align: 'center' })
  doc.text('PH NO 0161-2675525, 5051296', width/2, 38, { align: 'center' })
  doc.text('EMAIL: info@seelube.com', width/2, 44, { align: 'center' })
  doc.text('WEBSITE: www.oilandlubricant.com', width/2, 50, { align: 'center' })
  doc.setTextColor(255,0,0)
  doc.text('OFFER FOR ST KOOL LUBRICANTS', width/2, 60, {align: 'center'})
  doc.setTextColor(0,0,0)
  // Company details end

  // TODO : Align fields perfectly along borders
  const refno = 'Q REF NO: ' + data.refNo
  doc.text(refno, 15, 70)
  const date = 'DATE: ' + (data.date.split("-").reverse().join("-"));
  doc.text(date, 160, 70)

  doc.text('Submitted to:', 15, 80)
  const custName = data.custName
  const custAddress = data.custAddress
  doc.text(custName, 18, 87)
  doc.text(custAddress, 18, 92)

  const products = JSON.parse(data.dataInputs)
  console.log(products)
  var header = [['Sr No','Item','UOQ','Price per Unit','Discount','GST', 'Total Price']]
  var prods = []
  for(var i=0; i<products.length; i++){
    var indiProd = [i+1, products[i].prodName, products[i].unitQuantity, products[i].priceUnit, products[i].discount, products[i].gst]
    var totalPrice = (1-products[i].discount/100)*(products[i].unitQuantity*products[i].priceUnit)*(1+products[i].gst/100)
    var totalPriceDec = (Math.round(totalPrice*100) / 100).toFixed(2)
    indiProd.push(totalPriceDec)
    prods.push(indiProd)
  }

  autoTable(doc, {
    startY: 100,
    head: header,
    body: prods
  })

  var tableEnd = doc.previousAutoTable.finalY

  // TODO : Add terms of scale

  doc.text('GST EXTRA', 15, tableEnd+10)
  var delivery = 'DELIVERY: ' + data.delivery
  var payment = 'PAYMENT: ' + data.payment
  var validity = 'VALIDITY: ' + data.validity
  doc.text(delivery, 15, tableEnd+15)
  doc.text(payment, 15, tableEnd+20)
  doc.text(validity, 15, tableEnd+25)

  doc.setFontSize(12)
  var splitGreet = doc.splitTextToSize('Hope the above is in line with your requirements. Looking forward to receive your most valued order at your earliest.', 180)
  doc.text(splitGreet, 15, tableEnd+35)
  doc.text('Thanking You', 15, tableEnd+55)
  doc.text('For See Lube Technologies (P) Ltd', 125, tableEnd+65)
  doc.text('Authorized Signatory', 125, tableEnd+85)

  doc.save('test.pdf')
}

export default generatePdf
