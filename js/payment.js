import { users } from "../views/loginView.js";
import { cart } from "./app.js";

export class Payment {
  resTrans;
  constructor() {
    // this.checkout.addEventListener("click", this.makePayment.bind(this));
  }

  verifyPayment() {
    console.log(this.resTrans);
  }

  async makePayment(amount) {
    try {
      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-99ec29ddcf01c521ff29deac747d109a-X",
        tx_ref: "RX15",
        amount: amount,
        currency: "NGN",
        country: "NG",
        payment_options: "card",
        // specified redirect URL
        redirect_url: "",
        meta: {
          consumer_id: 23,
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: users.email,
          phone_number: users.phoneNumber,
          name: users.name,
        },
        callback: function (data) {
          // console.log(data);
          this.resTrans = data;
          console.log(this.resTrans);
          if (this.resTrans.status !== "successful") return;
          cart._clearCart();
          console.log("cleared Cart");
        },
        onclose: function () {
          // close modal
        },
        customizations: {
          title: "Rexha",
          description: "Payment for item(s) in cart",
          logo: "https://drive.google.com/file/d/178te7d6ws3h6yY8bnCvRfQvdbnASOB6o/view?usp=sharing",
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
