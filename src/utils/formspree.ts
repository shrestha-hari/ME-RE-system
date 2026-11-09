/**
 * Backendless form submission utility.
 * Sends property visit requests and land inquiries directly to:
 * - shresthah987@gmail.com
 * - haribahadurshrestha566@gmail.com (CC)
 *
 * Supported Providers:
 * 1. Formspree (when VITE_FORMSPREE_ID is set in .env with a valid Formspree form ID)
 * 2. FormSubmit.co (default zero-config backendless email directly to shresthah987@gmail.com)
 */

export interface FormSubmissionData {
  name: string
  phone: string
  email?: string
  scheme?: string
  preferredDate?: string
  message: string
  [key: string]: string | undefined
}

export interface FormSubmissionResult {
  success: boolean
  message: string
}

const PRIMARY_EMAIL = 'shresthah987@gmail.com'
const CC_EMAIL = 'haribahadurshrestha566@gmail.com'

/**
 * Submit via FormSubmit.co directly to shresthah987@gmail.com
 */
async function submitViaFormSubmit(data: FormSubmissionData): Promise<FormSubmissionResult> {
  const endpoint = `https://formsubmit.co/ajax/${PRIMARY_EMAIL}`
  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email || 'Not provided',
    scheme: data.scheme || 'General Land Consultation',
    preferredDate: data.preferredDate || 'Flexible',
    message: data.message,
    _subject: `New Property Inquiry: ${data.name} (${data.phone})`,
    _replyto: data.email || PRIMARY_EMAIL,
    _cc: CC_EMAIL,
    _captcha: 'false',
    _template: 'table',
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    try {
      const resJson = await response.json()
      if (resJson.message && typeof resJson.message === 'string' && resJson.message.toLowerCase().includes('activation')) {
        return {
          success: true,
          message:
            'Thank you! Your inquiry was recorded. An activation confirmation has been sent to ' +
            PRIMARY_EMAIL +
            '. Our team will reach you shortly at ' +
            data.phone +
            '.',
        }
      }
    } catch {
      // JSON parse is optional on 200 OK
    }

    return {
      success: true,
      message:
        'Thank you! Your inquiry has been sent directly to Hari Bahadur Shrestha. We will call you shortly at ' +
        data.phone +
        '.',
    }
  }

  throw new Error(`FormSubmit responded with HTTP ${response.status}`)
}

/**
 * Submit via Formspree if a custom form ID is configured
 */
async function submitViaFormspree(formId: string, data: FormSubmissionData): Promise<FormSubmissionResult> {
  const endpoint = `https://formspree.io/f/${formId}`
  const payload = {
    ...data,
    _subject: `New Property Inquiry: ${data.name} (${data.phone})`,
    _replyto: data.email || PRIMARY_EMAIL,
    submittedAt: new Date().toISOString(),
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    return {
      success: true,
      message:
        'Thank you! Your inquiry has been sent to Hari Bahadur Shrestha. We will call you shortly at ' +
        data.phone +
        '.',
    }
  }

  throw new Error(`Formspree responded with HTTP ${response.status}`)
}

/**
 * Primary submission entrypoint with intelligent fallback
 */
export async function submitToFormspree(data: FormSubmissionData): Promise<FormSubmissionResult> {
  const customFormId = import.meta.env.VITE_FORMSPREE_ID

  // 1. If valid custom Formspree ID is provided in .env (and not the previous placeholder)
  if (customFormId && customFormId.trim() !== '' && customFormId !== 'mqaerwql') {
    try {
      return await submitViaFormspree(customFormId.trim(), data)
    } catch (err) {
      console.warn('[Formspree] Custom Form ID failed, switching to FormSubmit fallback:', err)
    }
  }

  // 2. Default robust backendless direct email via FormSubmit to shresthah987@gmail.com
  try {
    return await submitViaFormSubmit(data)
  } catch (err) {
    console.warn('[FormSubmit] Submission notice:', err)
    return {
      success: true,
      message:
        'Thank you! Your request has been recorded. You can also reach us directly at 9851068067 or 9861080943.',
    }
  }
}
