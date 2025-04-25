
export async function trackFacebookConversion(eventName: string, eventData: any) {
  try {
    const response = await fetch('/.netlify/functions/track-fb-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to track conversion');
    }

    return true;
  } catch (error) {
    console.error('Error tracking Facebook conversion:', error);
    return false;
  }
}
