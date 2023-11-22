import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { FormikHelpers, useFormik } from 'formik'
import type PayPal from '@paypal/paypal-js'

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPal.PayPalButtonsComponentOptions['style']

type PayPalFormValues = { _paypal_token?: string }

type PayPalBttnOnSubmit = (
  values: PayPalFormValues,
  formikHelpers: FormikHelpers<PayPalFormValues>
) => void | Promise<any>

interface PayPalButtonProps {
  onSubmit: PayPalBttnOnSubmit
  initialValues: PayPalFormValues
  env: string
}

const PayPalButtonFC: React.FC<PayPalButtonProps> = ({ onSubmit, initialValues, env }) => {
  const ref = useRef<HTMLDivElement>(null)
  const formik = useFormik({
    onSubmit,
    initialValues,
  })

  const waitUntilSubmitted = async () => {
    while (formik.isSubmitting) {
      await new Promise((res) => setTimeout(res, 100))
    }
  }

  const createOrderOrBillingAgreement = async () => {
    formik.submitForm()
    await waitUntilSubmitted() //
    if (formik.isValid) formik.setSubmitting(true)
    return formik.values._paypal_token!
  }

  const onApprove = async () => {
    // do something on success
  }

  const paypal = window['paypal']
  if (!paypal) return null

  const Button = (paypal.Buttons! as any).driver('react', {
    React,
    ReactDOM,
  }) as React.ComponentType<PayPal.PayPalButtonsComponentOptions & { commit: boolean; env: string }>

  useEffect(() => {
    if (formik.isSubmitting) ref.current?.setAttribute('data-invisible', '')
    else ref.current?.removeAttribute('data-invisible')
  }, [formik.isSubmitting])

  return (
    <div ref={ref} className="paypal-bttn__container">
      <Button
        commit
        env={env}
        createBillingAgreement={createOrderOrBillingAgreement}
        onApprove={onApprove}
        onCancel={() => formik.setSubmitting(false)}
        onError={() => formik.setSubmitting(false)}
        style={buttonStyle}
      />
    </div>
  )
}

export default PayPalButtonFC
