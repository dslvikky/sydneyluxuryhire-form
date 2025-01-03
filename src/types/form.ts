export interface EmailFormData {
  from_name: string;      // Sender's name
  to_name: string;        // Recipient's name (optional, could be preset in template)
  email: string;          // Sender's email
  phone: string;          // Phone number
  pickup_date: string;    // Pickup date
  return_date: string;    // Return date
  vehicle: string;        // Selected vehicle
  message: string;        // Additional message/requirements
  pickup_location: string; // Pickup location
} 