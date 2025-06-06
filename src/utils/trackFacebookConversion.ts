
interface UserData {
  em?: string; // hashed email
  ph?: string; // hashed phone
  fn?: string; // hashed first name
  ln?: string; // hashed last name
  ct?: string; // hashed city
  st?: string; // hashed state
  zp?: string; // hashed zip
  country?: string;
  external_id?: string;
}

interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
  }>;
  [key: string]: any;
}

interface EventData {
  userData?: UserData;
  customData?: CustomData;
}

export async function trackFacebookConversion(eventName: string, eventData: EventData) {
  try {
    const response = await fetch('/functions/track-fb-conversion', {
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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to track conversion');
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error tracking Facebook conversion:', error);
    return false;
  }
}
