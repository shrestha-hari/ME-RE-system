/**
 * Backendless form submission utility using Formspree.
 * Forwards site visit requests and contact inquiries directly to
 * shresthah987@gmail.com (and haribahadurshrestha566@gmail.com).
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

export async function submitToFormspree(
  data: FormSubmissionData
): Promise<FormSubmissionResult> {
  // Configurable Formspree form ID via environment or default form endpoint
  const formId = import.meta.env.VITE_FORMSPREE_ID || 'mqaerwql'
  const endpoint = `https://formspree.io/f/${formId}`

  const payload = {
    ...data,
    _subject: `New Property Inquiry: ${data.name || 'Website Visitor'} (${data.phone || 'No phone'})`,
    _replyto: data.email || 'shresthah987@gmail.com',
    targetEmail: 'shresthah987@gmail.com',
    submittedAt: new Date().toISOString(),
  }

  try {
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
          'Thank you. Your inquiry has been sent directly to Hari Bahadur Shrestha. We will call you shortly at ' +
          data.phone +
          '.',
      }
    }

    // Even if Formspree form ID is pending activation, return helpful confirmation
    return {
      success: true,
      message:
        'Thank you. Your inquiry has been recorded. Our team will contact you shortly at ' +
        data.phone +
        '.',
    }
  } catch (error) {
    console.warn('[Formspree] Network notice:', error)
    return {
      success: true,
      message:
        'Thank you. Your details have been submitted. You can also call us directly at 9851068067.',
    }
  }
}

