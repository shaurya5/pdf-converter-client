import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function InputFields() {
  const template = {
    prodName: "",
    unitQuantity: "",
    quantity: "",
    priceUnit: "",
    gst: "",
    discount: "",
  };

  const [data, setData] = useState([template]);

  function handleChange(event, index) {
    const { name, value } = event.target;
    const list = [...data]
    list[index][name] = value
    setData(list)
  }

  function addItem() {
    setData([...data, template]);
    console.log(data)
  }

  function deleteItem(index) {
    var items = [...data];
    items.splice(index, 1);
    setData(items);
  }

  return (
    <>
      <div className="row">
        <h4>Product Information</h4>
        {data.map((item, index) => {
          return (
            <div className="row mb-2" key={index}>
              <label>
                <strong>{index + 1}</strong>
              </label>
              <div className="col">
                <input
                  onChange={e => handleChange(e,index)}
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="prodName"
                />
              </div>
              <div className="col col-xs-4">
                <input
                  onChange={e => handleChange(e,index)}
                  type="number"
                  className="form-control"
                  placeholder="Units of Quantity"
                  name="unitQuantity"
                />
              </div>
              <div className="col">
                <input
                  onChange={e => handleChange(e,index)}
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  name="quantity"
                />
              </div>
              <div className="col">
                <input
                  onChange={e => handleChange(e,index)}
                  type="number"
                  className="form-control"
                  placeholder="Price per Unit"
                  name="priceUnit"
                />
              </div>
              <div className="col">
                <input
                  onChange={e => handleChange(e,index)}
                  type="number"
                  className="form-control"
                  placeholder="GST"
                  name="gst"
                />
              </div>
              <div className="col">
                <input
                  onChange={e => handleChange(e,index)}
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
        {data.length !== 1 ? (
          <button className="btn btn-danger del-btn" onClick={deleteItem}>
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default InputFields;
