# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

   _Answer_:

   1. Inline Style: Inline style is used in the wrapping div. And it not only manipulates visibility but also sets `display: block` which complicates maintenance of the component. Need to move that to css.
   2. Hardcoded Values: `env="sandbox"` is hardcoded. Should ideally come from environment variables or at least as a prop.

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.

   _Answer_: Please check `src/PayPalButtonFC.tsx`

3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).

   _Answer_: Please check `src/PayPalButtonFC.tsx`

4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

   _Answer_:

   1. [StackOverFlow](https://stackoverflow.com/questions/72922779/how-to-fix-duplicated-paypal-button-in-react-strict-mode) suggests that this is the dev environment feature related to side effects of `paypal.Buttons`
   2. Possible solutions are:
      1. Ignore: in prod a single button is rendered as expected, but it may complicate styling perception during dev.
      2. Try to modify `paypal.Buttons`: absolutely not recommended. Haven't tried this.
      3. Downgrade React to pre v18 (this is featured since v18): quite possible if nothing fom v18 is being used and strict mode is needed. Haven't tried this.
      4. Get rid of the strict mode: recommended.

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
