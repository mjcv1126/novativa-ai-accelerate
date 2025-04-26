
/**
 * SendFox API Integration
 */

export const SENDFOX_API_ENDPOINT = 'https://api.sendfox.com/contacts';

interface SendFoxResponse {
  success: boolean;
  message?: string;
}

/**
 * Add a subscriber to SendFox list
 */
export const addSubscriberToSendFox = async (email: string): Promise<SendFoxResponse> => {
  try {
    const response = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error adding subscriber');
    }

    const data = await response.json();
    return { success: true };
  } catch (error) {
    console.error('SendFox API Error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error desconocido al suscribir' 
    };
  }
};
