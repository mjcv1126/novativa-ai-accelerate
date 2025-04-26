
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
    // Use the correct path for the Supabase function
    const response = await fetch('/functions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        listId: 254803 // Novati list ID
      }),
    });

    if (!response.ok) {
      console.error('SendFox API Error:', response.status);
      const errorData = await response.json().catch(() => ({}));
      console.error('Error data:', errorData);
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { 
      success: data.success || true,
      message: data.message || 'Suscripción exitosa'
    };
  } catch (error) {
    console.error('SendFox API Error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error desconocido al suscribir' 
    };
  }
};
