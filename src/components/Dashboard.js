import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    refNo: "",
    date: "",
    custName: "",
    custAddress: "",
    contName: "",
    contMobile: "",
    refQuote: "",
    delivery: "--select--",
    payment: "--select--",
    priceBasis: "--select--",
    validity: "--select--",
  });

  const template = {
    prodName: "",
    unitQuantity: "",
    quantity: "",
    priceUnit: "",
    gst: "",
    discount: "",
    totalPrice: "",
  };

  const [dataInputs, setDataInputs] = useState([template]);

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleInputChange(event, index) {
    const { name, value } = event.target;
    const list = [...dataInputs];
    list[index][name] = value;
    setDataInputs(list);
  }

  function addItem() {
    setDataInputs([...dataInputs, template]);
  }

  function deleteItem(index) {
    var items = [...dataInputs];
    items.splice(index, 1);
    setDataInputs(items);
  }

  function checks() {
    const {
      refNo,
      date,
      custName,
      custAddress,
      contName,
      contMobile,
      refQuote,
      delivery,
      payment,
      priceBasis,
      validity,
    } = data;
    return(
      refNo &&
      date &&
      custName &&
      custAddress &&
      contName &&
      contMobile &&
      refQuote &&
      delivery &&
      payment &&
      priceBasis &&
      validity &&
      delivery !== "--select" &&
      payment !== "select" &&
      priceBasis !== "select" &&
      validity !== "select"
    )
  }

  function handleClick(event) {
    event.preventDefault();
    const products = { dataInputs };
    const finalData = {
      ...data,
      ...products,
    };
    const data1 = JSON.stringify(finalData.dataInputs);
    localStorage.setItem("refNo", data.refNo);
    localStorage.setItem("data", data);

    axios
      .post("https://pdf-converter0.herokuapp.com//create", {
        dataInputs: data1,
        refNo: finalData.refNo,
        date: finalData.date,
        custName: finalData.custName,
        custAddress: finalData.custAddress,
        contName: finalData.contName,
        contMobile: finalData.contMobile,
        refQuote: finalData.refQuote,
        delivery: finalData.delivery,
        payment: finalData.payment,
        priceBasis: finalData.priceBasis,
        validity: finalData.validity,
      })
      .then((resp) => console.log(resp))
      .catch((e) => console.log(e));

    navigate("/submit");
    window.location.reload();
    return false;
  }

  return (
    <div className="form container">
      <Form.Group className="mb-2">
        <h5>Reference Number</h5>
        <Form.Control onChange={handleChange} name="refNo" value={data.refNo} />
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Date</h5>
        <Form.Control
          type="date"
          onChange={handleChange}
          name="date"
          value={data.date}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Customer Name</h5>
        <Form.Control
          onChange={handleChange}
          name="custName"
          value={data.custName}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Customer Address</h5>
        <Form.Control
          onChange={handleChange}
          name="custAddress"
          value={data.custAddress}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Contact Person Name</h5>
        <Form.Control
          onChange={handleChange}
          name="contName"
          value={data.contName}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Contact Person Mobile</h5>
        <Form.Control
          type="tel"
          onChange={handleChange}
          name="contMobile"
          value={data.contMobile}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Reference of Quotation</h5>
        <Form.Control
          onChange={handleChange}
          name="refQuote"
          value={data.refQuote}
        />
      </Form.Group>
      <div className="row">
        <h4>Product Information</h4>
        {dataInputs.map((item, index) => {
          return (
            <div className="row mb-2" key={index}>
              <label>
                <strong>{index + 1}</strong>
              </label>
              <div className="col">
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="prodName"
                />
              </div>
              <div className="col col-xs-4">
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="number"
                  className="form-control"
                  placeholder="Units of Quantity"
                  name="unitQuantity"
                />
              </div>
              {/* <div className="col">
                <input
                  onChange={e => handleInputChange(e,index)}
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  name="quantity"
                />
              </div> */}
              <div className="col">
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="number"
                  className="form-control"
                  placeholder="Price per Unit"
                  name="priceUnit"
                />
              </div>
              <div className="col">
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="number"
                  className="form-control"
                  placeholder="GST"
                  name="gst"
                />
              </div>
              <div className="col">
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  type="number"
                  className="form-control"
                  placeholder="Discount"
                  name="discount"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="btns">
        <button className="btn btn-success add-btn m-1" onClick={addItem}>
          Add
        </button>
        {dataInputs.length !== 1 ? (
          <button className="btn btn-danger del-btn" onClick={deleteItem}>
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
      <Form.Group className="mb-2">
        <h5>Delivery</h5>
        <Form.Select
          defaultValue="--select--"
          onChange={handleChange}
          name="delivery"
          value={data.delivery}
        >
          <option disabled>--select--</option>
          <option>ex stock</option>
          <option>Within 1 week</option>
          <option>Within 3-4 weeks</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Payment</h5>
        <Form.Select
          defaultValue="--select--"
          onChange={handleChange}
          name="payment"
          value={data.payment}
        >
          <option disabled>--select--</option>
          <option>Advance</option>
          <option>Against Delivery</option>
          <option>Within a week</option>
          <option>Within 30 days</option>
          <option>Within 60 days</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Price basis</h5>
        <Form.Select
          defaultValue="--select--"
          onChange={handleChange}
          name="priceBasis"
          value={data.priceBasis}
        >
          <option disabled>--select--</option>
          <option>ex-works</option>
          <option>ex-shop</option>
          <option>FOR site</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <h5>Validity of offer</h5>
        <Form.Select
          defaultValue="--select--"
          onChange={handleChange}
          name="validity"
          value={data.valid}
        >
          <option disabled>--select--</option>
          <option>30 days</option>
          <option>60 days</option>
          <option>90 days</option>
        </Form.Select>
      </Form.Group>
      <div className="text-center">
        <Button className="w-25" onClick={handleClick} type="submit" disabled={!checks}>
          Submit Form
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
