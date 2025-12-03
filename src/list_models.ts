import dotenv from 'dotenv'
dotenv.config()

async function listModels() {
  const key = process.env.GEMINI_API_KEY
  if (!key) {
    console.error('GEMINI_API_KEY is not set')
    return
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      console.error('Error listing models:', data)
      return
    }

    console.log('Available Models:')
    if (data.models) {
      data.models.forEach((model: any) => {
        if (
          model.supportedGenerationMethods &&
          model.supportedGenerationMethods.includes('generateContent')
        ) {
          console.log(`- ${model.name}`)
        }
      })
    } else {
      console.log('No models found in response', data)
    }
  } catch (error) {
    console.error('Network error:', error)
  }
}

listModels()
