import PayPalButton, { PayPalFormValues } from './PayPalButton'
import PayPalButtonFC from './PayPalButtonFC'
import { Formik, FormikConfig } from 'formik'
import './App.css'
const submitHandler: FormikConfig<PayPalFormValues>['onSubmit'] = (_, formik) => {
  setTimeout(() => {
    formik.setValues({ _paypal_token: 'fake_paypal_token' })
    formik.setSubmitting(false)
  }, 3000)
}

function App() {
  return (
    <>
      <Formik<PayPalFormValues> onSubmit={submitHandler} initialValues={{}}>
        <PayPalButton />
      </Formik>
      <br />
      <p>Functional component</p>
      <PayPalButtonFC onSubmit={submitHandler} initialValues={{}} env="sandbox" />
    </>
  )
}

export default App
