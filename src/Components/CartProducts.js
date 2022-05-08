import { useEffect, useState } from "react";

const CardProducts = (props) => {
  const [product, setProduct] = useState([]);
  const [qunts, setQunt] = useState(0);
  const { totals, setTotal, discount, setdiscount, user } = props;
  console.log(totals, "sagar");
  console.log(user);
  function remove(index) {
    let products = product.filter(function (el, i) {
      return i !== index;
    });
    setProduct([...products]);

    console.log(product);
  }
  function handelsubmit(item, index) {
    item.qunt = +qunts;
    console.log(index, item);
    console.log(product);
    Total();
  }
  function Total() {
    let total = product.reduce(function (acc, elem, index) {
      let myString = parseInt(elem.sale_Price * elem.qunt);
      return acc + myString;
    }, 0);
    console.log(total);
    setTotal(total);
  }

  useEffect(
    () => {
      Total();
    },
    [product],
    []
  );

  const Todoserver = async () => {
    try {
      let response = await fetch("http://localhost:8080/Limited_Deal_Wellness");
      let data = await response.json();
      console.log(data);
      setProduct(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    Todoserver();
  }, []);

  function habdelchane(event) {
    event.preventDefault();
    let qunt = event.target.value;
    setQunt(qunt);
  }
  return (
    <>
      <div>
        {user.map((item, index) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              >
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={item.image}
                  alt=""
                />
                <div style={{ width: "100%" }}>
                  <p
                    style={{
                      marginTop: "0px",
                      marginLeft: "10px",
                      marginBottom: "5px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      marginTop: "0px",
                      marginLeft: "10px",
                      color: "gray",
                      fontStyle: "italic",
                      fontSize: "14px",
                    }}
                  >
                    {item.sellers}
                  </p>
                  {console.log(item.sellers)}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {" "}
                    <h4 style={{ color: "red" }}>{`Rs ${item.sale_Price}`}</h4>
                    <label>
                      QTY:
                      <select
                        type="select"
                        onChange={habdelchane}
                        onClick={() => handelsubmit(item, index)}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>{" "}
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p>Delivery between 24-48hrs</p>
                    <div
                      style={{
                        backgroundColor: "whitesmoke",
                        width: "2px",
                        height: "50px",
                        marginLeft: "100px",
                      }}
                    ></div>
                    <button
                      onClick={() => remove(index)}
                      style={{
                        backgroundColor: "whitesmoke",
                        color: "gray",
                        border: "none",
                        marginLeft: "10px",
                        height: "30px",
                        marginTop: "10px",
                      }}
                    >
                      REMOVE
                    </button>
                    <button
                      style={{
                        backgroundColor: "whitesmoke",
                        color: "gray",
                        border: "none",
                        marginLeft: "10px",
                        height: "30px",
                        marginTop: "10px",
                      }}
                    >
                      SAVE FOR LATER
                    </button>
                  </div>
                </div>
              </div>
              <hr style={{ width: "95%" }}></hr>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CardProducts;
