const body = {
  fullName: 'Arjun Verma',
  phoneNumber: '+919916604905',
  email: 'arjun.verma@example.com',
  message: 'Really enjoyed the show!'
}

const url = 'http://localhost:5175/api/feedback'

async function send() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const text = await res.text()
    console.log('status', res.status)
    console.log('body', text)
  } catch (err) {
    console.error('fetch error', err)
  }
}

send()
