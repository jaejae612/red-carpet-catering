// Email notification service using Supabase Edge Function + Resend
// Setup required:
// 1. Deploy the send-email edge function to Supabase
// 2. Add RESEND_API_KEY to Supabase secrets: supabase secrets set RESEND_API_KEY=re_xxxxx

import { supabase } from './supabase'

export const sendEmail = async ({ to, subject, html }) => {
  console.log('Sending email:', { to, subject, htmlLength: html?.length })
  
  if (!to || !subject || !html) {
    console.error('Missing email fields:', { to: !!to, subject: !!subject, html: !!html })
    return { success: false, error: 'Missing required fields' }
  }
  
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: JSON.stringify({ to, subject, html })
    })

    if (error) {
      console.error('Email error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: error.message }
  }
}

export const formatCurrency = (amount) => `₱${amount?.toLocaleString() || 0}`

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const [hours, minutes] = timeStr.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

// Email templates
export const emailTemplates = {
  newBookingCustomer: (booking) => ({
    subject: `Booking Confirmed - Red Carpet Catering #${booking.id?.slice(0, 8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b91c1c, #991b1b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-label { font-weight: bold; width: 140px; color: #6b7280; }
          .total { font-size: 24px; color: #b91c1c; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .btn { display: inline-block; background: #b91c1c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">🎉 Booking Confirmed!</h1>
            <p style="margin:10px 0 0;">Thank you for choosing Red Carpet Catering</p>
          </div>
          <div class="content">
            <p>Dear <strong>${booking.customer_name}</strong>,</p>
            <p>Your catering booking has been received and is being processed. Here are your booking details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span>#${booking.id?.slice(0, 8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span>${formatDate(booking.event_date)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Time:</span>
                <span>${formatTime(booking.event_time)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Venue:</span>
                <span>${booking.venue}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Menu Package:</span>
                <span>${booking.menu_package}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${booking.number_of_pax} pax</span>
              </div>
              ${booking.motif ? `
              <div class="detail-row">
                <span class="detail-label">Motif/Theme:</span>
                <span>${booking.motif}</span>
              </div>
              ` : ''}
              <div class="total">
                Total: ${formatCurrency(booking.total_amount)}
              </div>
            </div>
            
            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Our team will review your booking and confirm within 24 hours</li>
              <li>You may be contacted for additional details or payment arrangements</li>
              <li>Check your booking status anytime on our website</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="https://red-carpet-catering.pages.dev/my-orders" class="btn">View My Bookings</a>
            </p>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
            <p>Premium catering services for all occasions</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  newBookingAdmin: (booking) => ({
    subject: `🔔 New Booking Received - ${booking.customer_name} - ${formatDate(booking.event_date)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #b91c1c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .booking-card { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #b91c1c; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
          .label { font-weight: bold; color: #6b7280; }
          .total { font-size: 20px; color: #b91c1c; font-weight: bold; margin-top: 15px; }
          .btn { display: inline-block; background: #b91c1c; color: white; padding: 10px 25px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">🔔 New Catering Booking</h2>
          </div>
          <div class="content">
            <div class="booking-card">
              <h3 style="margin-top:0; color: #b91c1c;">${booking.customer_name}</h3>
              <div class="detail-row"><span class="label">📅 Date:</span> ${formatDate(booking.event_date)}</div>
              <div class="detail-row"><span class="label">🕐 Time:</span> ${formatTime(booking.event_time)}</div>
              <div class="detail-row"><span class="label">📍 Venue:</span> ${booking.venue}</div>
              <div class="detail-row"><span class="label">🍽️ Package:</span> ${booking.menu_package}</div>
              <div class="detail-row"><span class="label">👥 Guests:</span> ${booking.number_of_pax} pax</div>
              <div class="detail-row"><span class="label">📞 Phone:</span> ${booking.customer_phone}</div>
              <div class="detail-row"><span class="label">📧 Email:</span> ${booking.customer_email || 'N/A'}</div>
              ${booking.motif ? `<div class="detail-row"><span class="label">🎨 Motif:</span> ${booking.motif}</div>` : ''}
              ${booking.special_requests ? `<div class="detail-row"><span class="label">📝 Notes:</span> ${booking.special_requests}</div>` : ''}
              <div class="total">Total: ${formatCurrency(booking.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://red-carpet-catering.pages.dev/admin/bookings" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  newFoodOrderCustomer: (order) => ({
    subject: `Order Confirmed - Red Carpet Catering #${order.id?.slice(0, 8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ea580c, #c2410c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { padding: 10px 0; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; }
          .total { font-size: 24px; color: #ea580c; font-weight: bold; text-align: right; margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">🛒 Order Confirmed!</h1>
            <p style="margin:10px 0 0;">Your food order is being prepared</p>
          </div>
          <div class="content">
            <p>Dear <strong>${order.customer_name}</strong>,</p>
            <p>Thank you for your order! Here are your order details:</p>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> #${order.id?.slice(0, 8).toUpperCase()}</p>
              <p><strong>Delivery Date:</strong> ${formatDate(order.delivery_date)}</p>
              <p><strong>Delivery Time:</strong> ${formatTime(order.delivery_time) || 'To be confirmed'}</p>
              <p><strong>Delivery Address:</strong> ${order.delivery_address}</p>
              
              <h4 style="margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h4>
              ${order.items?.map(item => `
                <div class="item">
                  <span>${item.name} × ${item.quantity}</span>
                  <span>${formatCurrency(item.price * item.quantity)}</span>
                </div>
              `).join('') || ''}
              
              <div class="total">
                Total: ${formatCurrency(order.total_amount)}
              </div>
            </div>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  newFoodOrderAdmin: (order) => ({
    subject: `🛒 New Food Order - ${order.customer_name} - ${formatDate(order.delivery_date)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ea580c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .order-card { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ea580c; }
          .item { padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
          .total { font-size: 20px; color: #ea580c; font-weight: bold; margin-top: 15px; }
          .btn { display: inline-block; background: #ea580c; color: white; padding: 10px 25px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">🛒 New Food Order</h2>
          </div>
          <div class="content">
            <div class="order-card">
              <h3 style="margin-top:0; color: #ea580c;">${order.customer_name}</h3>
              <p><strong>📅 Delivery:</strong> ${formatDate(order.delivery_date)} ${order.delivery_time ? `at ${formatTime(order.delivery_time)}` : ''}</p>
              <p><strong>📍 Address:</strong> ${order.delivery_address}</p>
              <p><strong>📞 Phone:</strong> ${order.customer_phone}</p>
              
              <h4>Items:</h4>
              ${order.items?.map(item => `
                <div class="item">${item.name} × ${item.quantity} - ${formatCurrency(item.price * item.quantity)}</div>
              `).join('') || ''}
              
              <div class="total">Total: ${formatCurrency(order.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://red-carpet-catering.pages.dev/admin/food-orders" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  bookingStatusUpdate: (booking, newStatus) => ({
    subject: `Booking ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)} - Red Carpet Catering`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${newStatus === 'confirmed' ? '#059669' : newStatus === 'cancelled' ? '#dc2626' : '#b91c1c'}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; background: ${newStatus === 'confirmed' ? '#d1fae5' : newStatus === 'cancelled' ? '#fee2e2' : '#fef3c7'}; color: ${newStatus === 'confirmed' ? '#059669' : newStatus === 'cancelled' ? '#dc2626' : '#d97706'}; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Booking Status Update</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${booking.customer_name}</strong>,</p>
            <p>Your booking status has been updated:</p>
            <p style="text-align: center; margin: 30px 0;">
              <span class="status-badge">${newStatus.toUpperCase()}</span>
            </p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Event Date: ${formatDate(booking.event_date)}</li>
              <li>Venue: ${booking.venue}</li>
              <li>Guests: ${booking.number_of_pax} pax</li>
            </ul>
            ${newStatus === 'confirmed' ? '<p>We look forward to serving you!</p>' : ''}
            ${newStatus === 'cancelled' ? '<p>If you have any questions, please contact us.</p>' : ''}
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
}

// Send booking notification emails
export const sendBookingNotifications = async (booking, adminEmail = 'redcarpetbookings@gmail.com') => {
  const results = { customer: null, admin: null }

  // Send to customer if they have an email
  if (booking.customer_email) {
    const customerEmail = emailTemplates.newBookingCustomer(booking)
    results.customer = await sendEmail({
      to: booking.customer_email,
      subject: customerEmail.subject,
      html: customerEmail.html
    })
  }

  // Send to admin
  const adminEmailContent = emailTemplates.newBookingAdmin(booking)
  results.admin = await sendEmail({
    to: adminEmail,
    subject: adminEmailContent.subject,
    html: adminEmailContent.html
  })

  return results
}

// Send food order notification emails
export const sendFoodOrderNotifications = async (order, adminEmail = 'redcarpetbookings@gmail.com') => {
  const results = { customer: null, admin: null }

  // Send to customer if they have an email
  if (order.customer_email) {
    const customerEmail = emailTemplates.newFoodOrderCustomer(order)
    results.customer = await sendEmail({
      to: order.customer_email,
      subject: customerEmail.subject,
      html: customerEmail.html
    })
  }

  // Send to admin
  const adminEmailContent = emailTemplates.newFoodOrderAdmin(order)
  results.admin = await sendEmail({
    to: adminEmail,
    subject: adminEmailContent.subject,
    html: adminEmailContent.html
  })

  return results
}

// Send status update email
export const sendStatusUpdateEmail = async (booking, newStatus) => {
  if (!booking.customer_email) return { success: false, error: 'No customer email' }
  
  const emailContent = emailTemplates.bookingStatusUpdate(booking, newStatus)
  return await sendEmail({
    to: booking.customer_email,
    subject: emailContent.subject,
    html: emailContent.html
  })
}
