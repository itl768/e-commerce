import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: 'XS',
  },
  {
    value: 25,
    label: 'S',
  },
  {
    value: 50,
    label: 'M',
  },
  {
    value: 75,
    label: 'L',
  },
  
  {
    value: 100,
    label: 'XL',
  },
];

function valuetext(value) {
  return `${value}`;
}



const CartItem = props => {
  const { cartItem, cartKey } = props;
  const { product, amount } = cartItem;
  const classes = useStyles();
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
              src={product.img}alt="product"
              />
            </figure>
          </div>
          <div className="media-content">

            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
                <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Size
      </Typography>
      <Slider
        defaultValue={25}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={25}
        
        marks={marks}
      />
    </div>
                       

            <div>{product.shortDesc}</div>
            <small>{`${amount} in cart`}</small>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
