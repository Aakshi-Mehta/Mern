//redux ke liye 3 cheeze bana is important-reducers actions constants

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

// Safe fallback for DevTools
let enhancer;
try {
  enhancer = composeWithDevTools(applyMiddleware(...middleware));
} catch (e) {
  enhancer = compose(applyMiddleware(...middleware));
}

const store = createStore(
  reducer,
  initialState,
  enhancer
);

export default store;


/*Redux is **important** in large React applications because it solves several **critical problems** related to **state management**, especially when data is shared across many components.

---

## 🔑 Why Redux is Important

### 1. ✅ **Centralized State Management**

Instead of state being scattered across components (via `useState`), Redux stores all shared state in a **single global store**. This:

* Makes the app more predictable.
* Simplifies debugging.
* Makes it easier to manage complex state.

**Example:** In an e-commerce site, components like `Cart`, `Navbar`, and `ProductPage` all need access to cart items. With Redux, they can access and update the cart from a single source.

---

### 2. 🔁 **Predictable State Changes**

Redux uses a strict pattern:

* **Action** is dispatched →
* **Reducer** handles it →
* **State is updated**

This makes state changes **traceable and easy to debug**, especially with tools like Redux DevTools.

---

### 3. 🔌 **Middleware Support (e.g., Redux Thunk)**

Middleware like `redux-thunk` enables:

* **Async operations** (e.g., fetching data from APIs).
* Logging, error reporting, and more.

**Example:** When logging in a user, you can make an API call inside a thunk, then update the state only after the response.

---

### 4. 📦 **Persistence & Sharing Data**

You can load initial data (e.g., cart from `localStorage`) into Redux and share it across multiple components without passing it down via props.

---

### 5. 🔍 **Improved Debugging with Redux DevTools**

Redux DevTools lets you:

* See every state change.
* Travel back in time (undo actions).
* Inspect actions and payloads.

This makes debugging **faster and more accurate**.

---

### 6. 📐 **Scalability**

Redux enforces a structure (`actions → reducers → store`) that makes it **easier to scale apps** as they grow.

---

## ❓When is Redux Overkill?

Redux is **not necessary** for small apps where state is localized. In such cases, `useState`, `useReducer`, or `Context API` may be enough.

Use Redux when:

* Many components need to access or update the same state.
* You have complex data flows.
* You want full control over state changes.

---

## 🧠 In Summary:

Redux is important because it:

* Keeps your app state centralized and predictable.
* Makes it easier to manage, debug, and scale your app.
* Supports async operations and persistent data easily.

Let me know if you want a comparison with `Context API` or `Recoil`, or if you want help deciding whether to use Redux in your own app.
*/