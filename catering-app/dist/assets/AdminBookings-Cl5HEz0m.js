import{h as Y,r as x,m as Ee,j as e,X as De,g as Ke,f as te,k as se,s as N,i as Ze,d as et,L as tt,C as we,b as Ce,P as st}from"./index-C8zvP2Xs.js";import{T as at}from"./SkeletonLoaders-CWA6pHAh.js";import{e as nt,a as rt,P as lt}from"./PaymentTracker-Bkqk3HvP.js";import{A as it}from"./alert-circle-DyXsyZsE.js";import{C as ot,M as Pe}from"./map-pin-DgODsdxK.js";import{C as dt}from"./credit-card-BVOGDSaz.js";import{S as ae}from"./save-Djxc5P1n.js";import{A as ct}from"./arrow-left-D9jt5TVE.js";import{S as Se}from"./search-C3Gyo4Fj.js";import{S as mt}from"./send-cY6IvX0m.js";import{P as ut}from"./pen-CeXgDcPp.js";import{T as pt}from"./trash-2-D89-rTfC.js";import{M as xt}from"./mail-CYHHqwRV.js";import{S as $e}from"./star-DZJ9-ctc.js";import{M as gt}from"./minus-D7e_pvx_.js";import{P as ht}from"./plus-Ci4vc9Tg.js";import{C as ft}from"./check-Dex8TUbH.js";import"./alert-triangle-DpF-GL_k.js";const bt=Y("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]),yt=Y("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),vt=Y("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]),jt=Y("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);function _t({booking:s,onClose:i,onSave:c}){var P;const[n,m]=x.useState({customer_name:"",customer_phone:"",customer_email:"",venue:"",event_date:"",event_time:"",number_of_pax:60,motif:"",special_requests:"",status:"pending",payment_status:"unpaid",deposit_amount:0,payment_notes:"",total_amount:0}),[f,y]=x.useState(!1),[S,E]=x.useState(""),[M,a]=x.useState("");x.useEffect(()=>{s&&m({customer_name:s.customer_name||"",customer_phone:s.customer_phone||"",customer_email:s.customer_email||"",venue:s.venue||"",event_date:s.event_date||"",event_time:s.event_time||"",number_of_pax:s.number_of_pax||60,motif:s.motif||"",special_requests:s.special_requests||"",status:s.status||"pending",payment_status:s.payment_status||"unpaid",deposit_amount:s.deposit_amount||0,payment_notes:s.payment_notes||"",total_amount:s.total_amount||0})},[s]);const v=async d=>{d.preventDefault(),y(!0),E(""),a("");try{const _={customer_name:n.customer_name,customer_phone:n.customer_phone,customer_email:n.customer_email,venue:n.venue,event_date:n.event_date,event_time:n.event_time,number_of_pax:n.number_of_pax,motif:n.motif,special_requests:n.special_requests,status:n.status,payment_status:n.payment_status,deposit_amount:n.deposit_amount,payment_notes:n.payment_notes,total_amount:n.total_amount};n.payment_status==="deposit_paid"&&!s.deposit_paid_at&&(_.deposit_paid_at=new Date().toISOString()),n.payment_status==="fully_paid"&&!s.balance_paid_at&&(_.balance_paid_at=new Date().toISOString());const{error:q}=await N.from("bookings").update(_).eq("id",s.id);if(q)throw q;a("Booking updated successfully!"),setTimeout(()=>{c==null||c(),i()},1e3)}catch(_){E(_.message||"Failed to update booking")}finally{y(!1)}},D=[];for(let d=6;d<=22;d++)["00","30"].forEach(_=>{const q=d>12?d-12:d===0?12:d,R=d>=12?"PM":"AM";D.push({value:`${d.toString().padStart(2,"0")}:${_}`,label:`${q}:${_} ${R}`})});const z=Ee[s==null?void 0:s.menu_package];return e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold text-gray-800",children:"Edit Booking"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["#",(P=s==null?void 0:s.id)==null?void 0:P.slice(0,8)," • ",z==null?void 0:z.name]})]}),e.jsx("button",{onClick:i,className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(De,{size:20})})]}),e.jsxs("form",{onSubmit:v,className:"p-6 space-y-6",children:[S&&e.jsxs("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(it,{size:20}),S]}),M&&e.jsxs("div",{className:"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(Ke,{size:20}),M]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Customer Information"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),e.jsx("input",{type:"text",value:n.customer_name,onChange:d=>m({...n,customer_name:d.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Phone"}),e.jsx("input",{type:"tel",value:n.customer_phone,onChange:d=>m({...n,customer_phone:d.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{type:"email",value:n.customer_email,onChange:d=>m({...n,customer_email:d.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Event Details"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Date"}),e.jsxs("div",{className:"relative",children:[e.jsx(te,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"date",value:n.event_date,onChange:d=>m({...n,event_date:d.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Time"}),e.jsxs("div",{className:"relative",children:[e.jsx(ot,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("select",{value:n.event_time,onChange:d=>m({...n,event_time:d.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:D.map(d=>e.jsx("option",{value:d.value,children:d.label},d.value))})]})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Venue"}),e.jsxs("div",{className:"relative",children:[e.jsx(Pe,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",value:n.venue,onChange:d=>m({...n,venue:d.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Number of Guests"}),e.jsxs("div",{className:"relative",children:[e.jsx(se,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"number",min:"30",value:n.number_of_pax,onChange:d=>m({...n,number_of_pax:parseInt(d.target.value)}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Total Amount (₱)"}),e.jsx("input",{type:"number",value:n.total_amount,onChange:d=>m({...n,total_amount:parseInt(d.target.value)}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Status & Payment"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Booking Status"}),e.jsxs("select",{value:n.status,onChange:d=>m({...n,status:d.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Status"}),e.jsxs("div",{className:"relative",children:[e.jsx(dt,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsxs("select",{value:n.payment_status,onChange:d=>m({...n,payment_status:d.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Deposit Amount (₱)"}),e.jsx("input",{type:"number",value:n.deposit_amount,onChange:d=>m({...n,deposit_amount:parseInt(d.target.value)||0}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Balance Due"}),e.jsxs("div",{className:"px-4 py-2 bg-gray-100 rounded-lg font-semibold text-red-700",children:["₱",(n.total_amount-n.deposit_amount).toLocaleString()]})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Other Details"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Motif/Theme"}),e.jsx("input",{type:"text",value:n.motif,onChange:d=>m({...n,motif:d.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Special Requests"}),e.jsx("textarea",{value:n.special_requests,onChange:d=>m({...n,special_requests:d.target.value}),rows:2,className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Notes"}),e.jsx("textarea",{value:n.payment_notes,onChange:d=>m({...n,payment_notes:d.target.value}),rows:2,placeholder:"e.g., GCash payment received, reference #12345",className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{className:"flex gap-3 pt-4 border-t",children:[e.jsxs("button",{type:"submit",disabled:f,className:"flex-1 bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2",children:[e.jsx(ae,{size:18})," ",f?"Saving...":"Save Changes"]}),e.jsx("button",{type:"button",onClick:i,className:"px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50",children:"Cancel"})]})]})]})})}const ne=async({to:s,subject:i,html:c})=>{if(!s||!i||!c)return{success:!1,error:"Missing required fields"};try{const{data:{session:n}}=await N.auth.getSession(),m=await fetch("https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-email",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(n==null?void 0:n.access_token)||""}`},body:JSON.stringify({to:s,subject:i,html:c})}),f=await m.json();return m.ok?{success:!0,data:f}:(console.error("Email error:",f),{success:!1,error:f.error||"Failed to send email"})}catch(n){return console.error("Email error:",n),{success:!1,error:n.message}}},A=s=>`₱${(s==null?void 0:s.toLocaleString())||0}`,k=s=>s?new Date(s).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"",U=s=>{if(!s)return"";const[i,c]=s.split(":"),n=parseInt(i),m=n>=12?"PM":"AM";return`${n>12?n-12:n===0?12:n}:${c} ${m}`},re={newBookingCustomer:s=>{var i,c;return{subject:`Booking Confirmed - Red Carpet Catering #${(i=s.id)==null?void 0:i.slice(0,8)}`,html:`
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
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>Your catering booking has been received and is being processed. Here are your booking details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span>#${(c=s.id)==null?void 0:c.slice(0,8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span>${k(s.event_date)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Time:</span>
                <span>${U(s.event_time)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Venue:</span>
                <span>${s.venue}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Menu Package:</span>
                <span>${s.menu_package}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${s.number_of_pax} pax</span>
              </div>
              ${s.motif?`
              <div class="detail-row">
                <span class="detail-label">Motif/Theme:</span>
                <span>${s.motif}</span>
              </div>
              `:""}
              <div class="total">
                Total: ${A(s.total_amount)}
              </div>
            </div>
            
            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Our team will review your booking and confirm within 24 hours</li>
              <li>You may be contacted for additional details or payment arrangements</li>
              <li>Check your booking status anytime on our website</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/my-orders" class="btn">View My Bookings</a>
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
    `}},newBookingAdmin:s=>({subject:`🔔 New Booking Received - ${s.customer_name} - ${k(s.event_date)}`,html:`
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
              <h3 style="margin-top:0; color: #b91c1c;">${s.customer_name}</h3>
              <div class="detail-row"><span class="label">📅 Date:</span> ${k(s.event_date)}</div>
              <div class="detail-row"><span class="label">🕐 Time:</span> ${U(s.event_time)}</div>
              <div class="detail-row"><span class="label">📍 Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="label">🍽️ Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="label">👥 Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="label">📞 Phone:</span> ${s.customer_phone}</div>
              <div class="detail-row"><span class="label">📧 Email:</span> ${s.customer_email||"N/A"}</div>
              ${s.motif?`<div class="detail-row"><span class="label">🎨 Motif:</span> ${s.motif}</div>`:""}
              ${s.special_requests?`<div class="detail-row"><span class="label">📝 Notes:</span> ${s.special_requests}</div>`:""}
              <div class="total">Total: ${A(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/bookings" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}),newFoodOrderCustomer:s=>{var i,c,n;return{subject:`Order Confirmed - Red Carpet Catering #${(i=s.id)==null?void 0:i.slice(0,8)}`,html:`
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
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>Thank you for your order! Here are your order details:</p>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> #${(c=s.id)==null?void 0:c.slice(0,8).toUpperCase()}</p>
              <p><strong>Delivery Date:</strong> ${k(s.delivery_date)}</p>
              <p><strong>Delivery Time:</strong> ${U(s.delivery_time)||"To be confirmed"}</p>
              <p><strong>Delivery Address:</strong> ${s.delivery_address}</p>
              
              <h4 style="margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h4>
              ${((n=s.items)==null?void 0:n.map(m=>`
                <div class="item">
                  <span>${m.name} × ${m.quantity}</span>
                  <span>${A(m.price*m.quantity)}</span>
                </div>
              `).join(""))||""}
              
              <div class="total">
                Total: ${A(s.total_amount)}
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
    `}},newFoodOrderAdmin:s=>{var i;return{subject:`🛒 New Food Order - ${s.customer_name} - ${k(s.delivery_date)}`,html:`
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
              <h3 style="margin-top:0; color: #ea580c;">${s.customer_name}</h3>
              <p><strong>📅 Delivery:</strong> ${k(s.delivery_date)} ${s.delivery_time?`at ${U(s.delivery_time)}`:""}</p>
              <p><strong>📍 Address:</strong> ${s.delivery_address}</p>
              <p><strong>📞 Phone:</strong> ${s.customer_phone}</p>
              
              <h4>Items:</h4>
              ${((i=s.items)==null?void 0:i.map(c=>`
                <div class="item">${c.name} × ${c.quantity} - ${A(c.price*c.quantity)}</div>
              `).join(""))||""}
              
              <div class="total">Total: ${A(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/food-orders" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}},eventReminder:(s,i)=>({subject:`Reminder: Your Event is in ${i} Day${i!==1?"s":""} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b91c1c, #991b1b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b91c1c; }
          .detail-row { padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-label { font-weight: bold; color: #6b7280; }
          .countdown { font-size: 48px; font-weight: bold; color: #b91c1c; text-align: center; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Event Reminder</h1>
            <p style="margin:10px 0 0;">Your event is coming up soon!</p>
          </div>
          <div class="content">
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>This is a friendly reminder about your upcoming event:</p>

            <div class="countdown">${i} day${i!==1?"s":""} to go!</div>

            <div class="booking-details">
              <div class="detail-row"><span class="detail-label">Event Date:</span> ${k(s.event_date)}</div>
              <div class="detail-row"><span class="detail-label">Time:</span> ${U(s.event_time)}</div>
              <div class="detail-row"><span class="detail-label">Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="detail-label">Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="detail-label">Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="detail-label">Total:</span> ${A(s.total_amount)}</div>
              ${s.payment_status!=="fully_paid"?`
              <div class="detail-row" style="color: #dc2626;">
                <span class="detail-label">Payment Status:</span> ${s.payment_status==="deposit_paid"?"Deposit Paid - Balance Due":"Payment Pending"}
              </div>`:""}
            </div>

            ${s.payment_status!=="fully_paid"?"<p><strong>Please ensure your payment is settled before the event.</strong></p>":""}
            <p>If you have any questions or changes, please contact us as soon as possible.</p>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `}),bookingStatusUpdate:(s,i)=>({subject:`Booking ${i.charAt(0).toUpperCase()+i.slice(1)} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${i==="confirmed"?"#059669":i==="cancelled"?"#dc2626":"#b91c1c"}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; background: ${i==="confirmed"?"#d1fae5":i==="cancelled"?"#fee2e2":"#fef3c7"}; color: ${i==="confirmed"?"#059669":i==="cancelled"?"#dc2626":"#d97706"}; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Booking Status Update</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>Your booking status has been updated:</p>
            <p style="text-align: center; margin: 30px 0;">
              <span class="status-badge">${i.toUpperCase()}</span>
            </p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Event Date: ${k(s.event_date)}</li>
              <li>Venue: ${s.venue}</li>
              <li>Guests: ${s.number_of_pax} pax</li>
            </ul>
            ${i==="confirmed"?"<p>We look forward to serving you!</p>":""}
            ${i==="cancelled"?"<p>If you have any questions, please contact us.</p>":""}
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `})},Nt=async(s,i="redcarpetbookings@gmail.com")=>{const c={customer:null,admin:null};if(s.customer_email){const m=re.newBookingCustomer(s);c.customer=await ne({to:s.customer_email,subject:m.subject,html:m.html})}const n=re.newBookingAdmin(s);return c.admin=await ne({to:i,subject:n.subject,html:n.html}),c},wt=async s=>{if(!s.customer_email)return{success:!1,error:"No customer email"};const i=Math.ceil((new Date(s.event_date)-new Date)/(1e3*60*60*24)),c=re.eventReminder(s,Math.max(i,0));return await ne({to:s.customer_email,subject:c.subject,html:c.html})},Ct=[{maxPax:60,tier:"60"},{maxPax:80,tier:"80"},{maxPax:100,tier:"100"},{maxPax:1/0,tier:"150"}],St={"dinner plate":{60:80,80:100,100:120,150:170},"dessert plate":{60:80,80:100,100:120,150:170},"soup bowl":{60:60,80:80,100:100,150:150},"spoon & fork":{60:80,80:100,100:120,150:170},"water glass":{60:66,80:88,100:110,150:165},teaspoon:{60:40,80:40,100:40,150:80},goblet:{60:50,80:50,100:75,150:100},"serving spoon":{60:7,80:7,100:7,150:7},pitcher:{60:2,80:3,100:3,150:4},"ice bucket":{60:4,80:6,100:6,150:8},"ice tong":{60:8,80:8,100:8,150:12},"serving tray":{60:3,80:3,100:4,150:6},"lechon tray":{60:1,80:1,100:1,150:1}},$t=s=>{for(const i of Ct)if(s<=i.maxPax)return i.tier;return"150"},kt=(s,i=8)=>{s=Math.max(s||0,30);const c=$t(s),n=Math.ceil(s/10),m=s<=80?2:s<=120?3:4,f=n+m,y=Math.ceil(s*1.1),S=Math.min(Math.max(i,6),12),E={};for(const[M,a]of Object.entries(St))E[M]=a[c]||0;return{...E,"round table":n,"guest chair":y,"chair cover":y,"buffet table":m,"chafing dish":S,"serving tong":S,"table cloth":f,"table napkin":s,"table skirting":m}},ke=s=>(s=Math.max(s||0,30),{head_waiter:s>=150?2:1,service:Math.max(Math.ceil(s/10),3),extra:Math.max(Math.ceil(s/25),1),student:Math.max(Math.ceil(s/30),1)}),Et=(s,i,c)=>{const n={},m=[];return s.filter(f=>f.event_date===i&&f.id!==c&&f.status!=="cancelled").forEach(f=>{if(f.assigned_equipment)for(const[y,S]of Object.entries(f.assigned_equipment))n[y]=(n[y]||0)+S;f.assigned_staff&&f.assigned_staff.forEach(y=>{m.includes(y.id)||m.push(y.id)})}),{usedEquipment:n,busyStaffIds:m}},Dt=(s,i)=>{if(i){let n=0;if(Array.isArray(i.menu_items)&&(n+=i.menu_items.length),Array.isArray(i.custom_dishes)&&(n+=i.custom_dishes.length),n>0)return Math.max(n,6)}return{menu470:7,menu510:9,menu560:10,menu620:11,menu660:11,menu680:12,menu810:12,cocktail:8}[s]||8};function Qt(){var Ne;const[s]=Ze(),i=et(),[c,n]=x.useState([]),[m,f]=x.useState([]),[y,S]=x.useState([]),[E,M]=x.useState(!0),[a,v]=x.useState(null),[D,z]=x.useState(""),[P,d]=x.useState(s.get("status")||"all"),[_,q]=x.useState(s.get("payment")||"all"),[R,le]=x.useState(""),[H,ie]=x.useState(""),[oe,qe]=x.useState("asc"),[W,Te]=x.useState(!!(s.get("status")||s.get("payment"))),[T,G]=x.useState(null),[Ae,de]=x.useState(!1),[ce,me]=x.useState(!1),[ue,pe]=x.useState(!1),[xe,ge]=x.useState(!1),[Q,O]=x.useState(!1),[J,X]=x.useState(""),[K,Me]=x.useState(!1);x.useEffect(()=>{he()},[]),x.useEffect(()=>{const t=s.get("booking");if(t&&c.length>0){const r=c.find(l=>l.id===t);r&&v(r)}},[c,s]);const he=async()=>{try{const[t,r,l]=await Promise.all([N.from("bookings").select("*").order("event_date",{ascending:!0}),N.from("staff").select("*").order("name"),N.from("equipment").select("*").order("category, name")]);n(t.data||[]),f(r.data||[]),S(l.data||[])}catch(t){console.error("Error:",t)}finally{M(!1)}},ze=async(t,r)=>{const l=c.find(u=>u.id===t);if(!l||r==="completed"&&(!l.payment_status||l.payment_status==="unpaid")&&!window.confirm(`⚠️ This booking has NO payments recorded.

Are you sure you want to mark it as completed without any payment?

Tip: Record a payment first using the Payment section below.`))return;if(r==="completed"&&l.payment_status==="deposit_paid"){const u=(l.total_amount||0)-(l.amount_paid||0);if(!window.confirm(`⚠️ This booking still has a balance of ₱${u.toLocaleString()}.

Are you sure you want to mark it as completed?

The balance will still be tracked in the payment section.`))return}if(r==="cancelled"&&l.status!=="cancelled"){const p=l.amount_paid>0||l.payment_status==="deposit_paid"||l.payment_status==="fully_paid"?`⚠️ This booking has payments recorded.

Cancelling will change payment status to "Refund Pending".

Are you sure?`:"Are you sure you want to cancel this booking?";if(!window.confirm(p))return}await N.from("bookings").update({status:r}).eq("id",t);const{data:o}=await N.from("bookings").select("*").eq("id",t).single();o&&(n(u=>u.map(p=>p.id===t?o:p)),(a==null?void 0:a.id)===t&&v(o))},Re=async()=>{if(a){me(!0);try{const t={assigned_staff:a.assigned_staff,assigned_equipment:a.assigned_equipment};a.status==="pending"&&(t.status="confirmed"),await N.from("bookings").update(t).eq("id",a.id),a.status==="pending"&&(a.status="confirmed"),n(r=>r.map(l=>l.id===a.id?a:l)),O(!1),alert("Saved!")}catch{alert("Error saving")}finally{me(!1)}}},Be=(t,r)=>{if(!a)return;const l=a.assigned_staff||[],u=l.find(p=>p.id===t.id)?l.filter(p=>p.id!==t.id):[...l,{id:t.id,name:t.name,role:r,type:t.type||"regular",daily_rate:t.daily_rate||0,phone:t.phone}];v({...a,assigned_staff:u}),O(!0)},fe=(t,r)=>{if(!a)return;const l=a.assigned_equipment||{};if(r<=0){const{[t]:o,...u}=l;v({...a,assigned_equipment:u})}else v({...a,assigned_equipment:{...l,[t]:r}});O(!0)},Le=()=>a?Et(c,a.event_date,a.id):{usedEquipment:{},busyStaffIds:[]},{usedEquipment:be,busyStaffIds:Oe}=a?Le():{usedEquipment:{},busyStaffIds:[]},F=a?c.filter(t=>t.event_date===a.event_date&&t.id!==a.id&&t.status!=="cancelled"):[],ye=t=>Math.max((t.quantity||0)-(be[t.id]||0),0),ve=t=>Oe.includes(t),Fe=()=>{if(!a)return;const t=a.number_of_pax||60,r=Dt(a.menu_package,a),l=ke(t),o=[];for(const[g,j]of Object.entries(l)){const C=m.filter(h=>(h.role===g||g==="extra"&&h.role==="student"||g==="student"&&h.role==="extra")&&h.available!==!1&&!ve(h.id));C.sort((h,L)=>(h.type||"regular")==="regular"&&(L.type||"regular")!=="regular"?-1:(h.type||"regular")!=="regular"&&(L.type||"regular")==="regular"?1:(h.daily_rate||0)-(L.daily_rate||0)),C.slice(0,j).forEach(h=>{o.push({id:h.id,name:h.name,role:g,type:h.type||"regular",daily_rate:h.daily_rate||0,phone:h.phone})})}const u=kt(t,r),p={};y.forEach(g=>{const j=(g.name||"").toLowerCase().trim();if(u[j]!==void 0){const C=ye(g),h=Math.min(u[j],C);h>0&&(p[g.id]=h)}}),v({...a,assigned_staff:o,assigned_equipment:p}),O(!0);const b=o.filter(g=>g.type==="on_call").length,w=o.filter(g=>g.type==="on_call").reduce((g,j)=>g+(j.daily_rate||0),0),V=y.filter(g=>(g.type||"owned")==="rental"&&p[g.id]).reduce((g,j)=>g+(p[j.id]||0)*(j.rental_cost||0),0),Xe={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},Z=[];for(const[g,j]of Object.entries(l)){const C=o.filter(h=>h.role===g).length;C<j&&Z.push(`${Xe[g]}: ${C}/${j}`)}const ee=[];for(const[g,j]of Object.entries(u)){const C=y.find(L=>(L.name||"").toLowerCase().trim()===g),h=C&&p[C.id]||0;h<j&&ee.push(`${g}: ${h}/${j}`)}let $=`✅ Auto-assigned for ${t} guests:

`;$+=`👥 Staff: ${o.length} total`,b>0&&($+=` (${b} on-call = ₱${w.toLocaleString()})`),$+=`
📦 Equipment: ${Object.keys(p).length} items`,V>0&&($+=` (rentals = ₱${V.toLocaleString()})`),Z.length>0&&($+=`

⚠️ Staff shortages:
${Z.join(`
`)}`),ee.length>0&&($+=`

⚠️ Equipment shortages:
${ee.join(`
`)}`),F.length>0&&($+=`

📅 ${F.length} other booking(s) on same date — availability adjusted`),$+=`

Review below and click Save when ready.`,alert($)},je=t=>({pending:"bg-amber-100 text-amber-700",confirmed:"bg-blue-100 text-blue-700",completed:"bg-green-100 text-green-700",cancelled:"bg-red-100 text-red-700"})[t]||"bg-gray-100 text-gray-700",Ie=t=>({unpaid:"bg-red-100 text-red-700",deposit_paid:"bg-amber-100 text-amber-700",fully_paid:"bg-green-100 text-green-700",refund_pending:"bg-orange-100 text-orange-700",refunded:"bg-gray-100 text-gray-700"})[t]||"bg-gray-100 text-gray-700",Ue=t=>({unpaid:"Unpaid",deposit_paid:"Deposit Paid",fully_paid:"Fully Paid",refund_pending:"Refund Pending",refunded:"Refunded"})[t]||"Unknown",He=()=>{he(),a&&N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&v(t)})},Ve=async()=>{var r,l;if(!a)return;if(!a.customer_email){alert("No customer email address");return}if(window.confirm(`Send booking confirmation email to ${a.customer_email}?`)){pe(!0);try{const o=await Nt(a);(r=o.customer)!=null&&r.success||(l=o.admin)!=null&&l.success?alert("Email sent successfully!"):alert("Failed to send email. Check console for details.")}catch(o){console.error("Email error:",o),alert("Error sending email: "+o.message)}finally{pe(!1)}}},Ye=()=>{if(!a)return;const t={...a,id:void 0,event_date:"",status:"pending",payment_status:"unpaid",deposit_amount:0};sessionStorage.setItem("duplicateBooking",JSON.stringify(t)),i("/book?duplicate=true")},We=async()=>{if(!a)return;if(!a.customer_email){alert("No email address on file.");return}if(Math.ceil((new Date(a.event_date)-new Date)/(1e3*60*60*24))<0){alert("This event has already passed.");return}ge(!0);try{const r=await wt(a);alert(r.success?`Reminder sent to ${a.customer_email}!`:"Failed: "+r.error)}catch(r){alert("Error: "+r.message)}finally{ge(!1)}},Ge=async t=>{if(!a)return;await N.from("bookings").update({expenses:t}).eq("id",a.id);const r={...a,expenses:t};v(r),n(l=>l.map(o=>o.id===r.id?r:o))},Qe=async()=>{if(!a)return;const r=(a.amount_paid||0)>0?`⚠️ "${a.customer_name}" has ₱${a.amount_paid.toLocaleString()} in payments.

This will permanently delete the booking and all payment records.

Are you sure?`:`Delete booking for "${a.customer_name}" on ${a.event_date}?

This action cannot be undone.`;if(!window.confirm(r))return;const{error:l}=await N.from("bookings").delete().eq("id",a.id);l?alert("Error deleting booking: "+l.message):(n(o=>o.filter(u=>u.id!==a.id)),v(null))},Je=()=>{z(""),d("all"),q("all"),le(""),ie("")},_e=[P!=="all",_!=="all",R!=="",H!==""].filter(Boolean).length,B=c.filter(t=>{var b,w,I;const r=((b=t.customer_name)==null?void 0:b.toLowerCase().includes(D.toLowerCase()))||((w=t.venue)==null?void 0:w.toLowerCase().includes(D.toLowerCase()))||((I=t.customer_phone)==null?void 0:I.includes(D)),l=P==="all"||t.status===P,o=_==="all"||t.payment_status===_||_==="unpaid"&&!t.payment_status,u=!R||t.event_date>=R,p=!H||t.event_date<=H;return r&&l&&o&&u&&p}).sort((t,r)=>{const l=new Date(t.event_date),o=new Date(r.event_date);return oe==="asc"?l-o:o-l});return E?e.jsx(at,{rows:8,cols:5}):e.jsx("div",{className:"py-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(tt,{to:"/admin",className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(ct,{size:24})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:"Manage Bookings"}),e.jsx("p",{className:"text-gray-500",children:"Assign staff and equipment"})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:()=>nt(B),className:"flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"Excel"]}),e.jsxs("button",{onClick:()=>rt(B),className:"flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"PDF"]})]})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-4 sticky top-24",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"relative mb-3",children:[e.jsx(Se,{className:"absolute left-3 top-2.5 text-gray-400",size:20}),e.jsx("input",{type:"text",placeholder:"Search name, venue, phone...",value:D,onChange:t=>z(t.target.value),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("button",{onClick:()=>Te(!W),className:"w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(jt,{size:16})," Filters ",_e>0&&e.jsx("span",{className:"bg-red-700 text-white px-2 py-0.5 rounded-full text-xs",children:_e})]}),W?e.jsx(we,{size:16}):e.jsx(Ce,{size:16})]}),W&&e.jsxs("div",{className:"mt-3 p-3 bg-gray-50 rounded-lg space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:P,onChange:t=>d(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]}),e.jsxs("select",{value:_,onChange:t=>q(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Payment"}),e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refund_pending",children:"Refund Pending"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Date Range"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("input",{type:"date",value:R,onChange:t=>le(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"From"}),e.jsx("input",{type:"date",value:H,onChange:t=>ie(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"To"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:oe,onChange:t=>qe(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"asc",children:"Date ↑ Soonest"}),e.jsx("option",{value:"desc",children:"Date ↓ Latest"})]}),e.jsx("button",{onClick:Je,className:"px-3 py-2 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-50",children:"Clear All"})]})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-2",children:[B.length," booking",B.length!==1?"s":""," found"]}),e.jsxs("div",{className:"space-y-2 max-h-[60vh] overflow-y-auto",children:[B.map(t=>{var r;return e.jsxs("button",{onClick:()=>{v(t),O(!1)},className:`w-full p-3 rounded-xl text-left ${(a==null?void 0:a.id)===t.id?"bg-red-50 border-2 border-red-700":"bg-gray-50 hover:bg-gray-100 border-2 border-transparent"}`,children:[e.jsxs("div",{className:"flex justify-between items-start mb-1",children:[e.jsx("span",{className:"font-medium text-gray-800 truncate",children:t.customer_name}),e.jsxs("div",{className:"flex items-center gap-1",children:[t.status==="completed"&&(!t.payment_status||t.payment_status==="unpaid")&&e.jsx("span",{title:"Completed but unpaid",className:"text-red-500 text-xs",children:"⚠️"}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${je(t.status)}`,children:t.status})]})]}),e.jsx("p",{className:"text-sm text-gray-500",children:t.event_date}),e.jsxs("div",{className:"flex items-center justify-between mt-1",children:[e.jsxs("span",{className:"text-sm text-gray-500",children:[t.number_of_pax," pax • ₱",(r=t.total_amount)==null?void 0:r.toLocaleString()]}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${Ie(t.payment_status)}`,children:Ue(t.payment_status)})]})]},t.id)}),B.length===0&&e.jsx("p",{className:"text-center text-gray-500 py-4",children:"No bookings found"})]})]})}),e.jsx("div",{className:"lg:col-span-2",children:a?e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-red-700 to-red-800 text-white p-6",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:a.customer_name}),e.jsxs("p",{className:"text-red-200",children:[(Ne=Ee[a.menu_package])==null?void 0:Ne.name," • ",a.menu_option]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[e.jsxs("button",{onClick:Ye,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(yt,{size:14})," Duplicate"]}),e.jsxs("button",{onClick:Ve,disabled:ue,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(mt,{size:14})," ",ue?"Sending...":"Email"]}),e.jsxs("button",{onClick:We,disabled:xe,className:"bg-white/20 hover:bg-amber-500 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(bt,{size:14})," ",xe?"Sending...":"Remind"]}),e.jsxs("button",{onClick:()=>de(!0),className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(ut,{size:14})," Edit"]}),e.jsxs("button",{onClick:Qe,className:"bg-white/20 hover:bg-red-500 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(pt,{size:14})," Delete"]}),e.jsxs("select",{value:a.status,onChange:t=>ze(a.id,t.target.value),className:"bg-white/20 text-white border-0 rounded-lg px-3 py-1 text-sm",children:[e.jsx("option",{value:"pending",className:"text-gray-800",children:"Pending"}),e.jsx("option",{value:"confirmed",className:"text-gray-800",children:"Confirmed"}),e.jsx("option",{value:"completed",className:"text-gray-800",children:"Completed"}),e.jsx("option",{value:"cancelled",className:"text-gray-800",children:"Cancelled"})]})]})]})}),e.jsxs("div",{className:"p-6 space-y-6",children:[a.status==="completed"&&(!a.payment_status||a.payment_status==="unpaid")&&e.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"⚠️"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-red-800",children:"Completed but Unpaid"}),e.jsx("p",{className:"text-xs text-red-600",children:"This booking is marked as completed but has no payments recorded. Record a payment below."})]})]}),a.status==="completed"&&a.payment_status==="deposit_paid"&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"💰"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-amber-800",children:"Balance Remaining"}),e.jsxs("p",{className:"text-xs text-amber-600",children:["Event completed with ₱",Math.max((a.total_amount||0)-(a.amount_paid||0),0).toLocaleString()," balance outstanding."]})]})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Event"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(te,{size:16,className:"text-gray-400 mt-0.5"}),a.event_date," at ",a.event_time]}),e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(Pe,{size:16,className:"text-gray-400 mt-0.5"}),a.venue]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(se,{size:16,className:"text-gray-400"}),a.number_of_pax," guests"]}),a.motif&&e.jsxs("p",{children:["🎨 ",a.motif]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Contact"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(st,{size:16,className:"text-gray-400"}),a.customer_phone]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(xt,{size:16,className:"text-gray-400"}),a.customer_email]})]})]})]}),e.jsx(lt,{bookingId:a.id,totalAmount:a.total_amount||0,currentStatus:a.payment_status,onStatusChange:()=>{N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&(v(t),n(r=>r.map(l=>l.id===t.id?t:l)))})}}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("button",{onClick:()=>Me(!K),className:"w-full flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold text-gray-700 flex items-center gap-2",children:[e.jsx(vt,{size:18})," Expense Tracking & Profit"]}),K?e.jsx(we,{size:18,className:"text-gray-400"}):e.jsx(Ce,{size:18,className:"text-gray-400"})]}),K&&(()=>{const t=a.expenses||{},r=(t.food_cost||0)+(t.staff_cost||0)+(t.rental_cost||0)+(t.transport_cost||0)+(t.other_cost||0),l=a.total_amount||0,o=l-r,u=l>0?(o/l*100).toFixed(1):0;return e.jsxs("div",{className:"mt-3 space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[[{key:"food_cost",label:"Food & Ingredients",icon:"🍖"},{key:"staff_cost",label:"Staff Wages",icon:"👥"},{key:"rental_cost",label:"Equipment Rental",icon:"📦"},{key:"transport_cost",label:"Transport & Gas",icon:"🚛"},{key:"other_cost",label:"Other Costs",icon:"📋"}].map(({key:p,label:b,icon:w})=>e.jsxs("div",{children:[e.jsxs("label",{className:"text-xs text-gray-500 mb-1 block",children:[w," ",b]}),e.jsx("input",{type:"number",min:"0",value:t[p]||"",placeholder:"0",onChange:I=>{const V={...t,[p]:parseInt(I.target.value)||0};v({...a,expenses:V})},className:"w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"})]},p)),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"📝 Notes"}),e.jsx("input",{type:"text",value:t.notes||"",placeholder:"Expense notes...",onChange:p=>{const b={...t,notes:p.target.value};v({...a,expenses:b})},className:"w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"})]})]}),e.jsx("div",{className:`rounded-lg p-3 ${o>=0?"bg-green-50 border border-green-200":"bg-red-50 border border-red-200"}`,children:e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-xs",children:"Revenue"}),e.jsxs("p",{className:"font-bold text-gray-800",children:["₱",l.toLocaleString()]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-xs",children:"Expenses"}),e.jsxs("p",{className:"font-bold text-red-600",children:["₱",r.toLocaleString()]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-gray-500 text-xs",children:["Profit (",u,"%)"]}),e.jsxs("p",{className:`font-bold ${o>=0?"text-green-600":"text-red-600"}`,children:["₱",o.toLocaleString()]})]})]})}),e.jsxs("button",{onClick:()=>Ge(a.expenses||{}),className:"w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2",children:[e.jsx(ae,{size:16})," Save Expenses"]})]})})()]}),a.review_rating&&e.jsxs("div",{className:"bg-amber-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-amber-800 mb-2 flex items-center gap-2",children:[e.jsx($e,{size:18})," Customer Review"]}),e.jsxs("div",{className:"flex items-center gap-1 mb-1",children:[[1,2,3,4,5].map(t=>e.jsx($e,{size:18,className:t<=a.review_rating?"text-amber-400 fill-amber-400":"text-gray-300"},t)),e.jsxs("span",{className:"text-sm text-gray-600 ml-2",children:[a.review_rating,"/5"]})]}),a.review_comment&&e.jsx("p",{className:"text-sm text-gray-700",children:a.review_comment})]}),(()=>{const t=c.filter(r=>r.id!==a.id&&(r.customer_name===a.customer_name||r.customer_phone===a.customer_phone));return t.length===0?null:e.jsxs("div",{className:"bg-purple-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-purple-800 mb-3 flex items-center gap-2",children:[e.jsx(se,{size:18})," Customer History (",t.length," previous)"]}),e.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto",children:t.slice(0,5).map(r=>{var l;return e.jsxs("div",{className:"flex items-center justify-between p-2 bg-white rounded-lg text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-gray-800",children:r.event_date}),e.jsxs("p",{className:"text-xs text-gray-500",children:[r.venue," • ",r.number_of_pax," pax"]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"font-medium text-gray-800",children:["₱",(l=r.total_amount)==null?void 0:l.toLocaleString()]}),e.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full ${je(r.status)}`,children:r.status})]})]},r.id)})}),t.length>5&&e.jsxs("p",{className:"text-xs text-purple-600 mt-2 text-center",children:["+",t.length-5," more bookings"]})]})})(),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"font-semibold text-gray-700",children:"Assign Staff & Equipment"}),e.jsxs("button",{onClick:Fe,className:"px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5",children:["⚡ Auto-Assign (",a.number_of_pax," pax)"]})]}),F.length>0&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 text-xs",children:[e.jsxs("p",{className:"font-medium text-amber-800",children:["📅 ",F.length," other booking(s) on ",a.event_date,":"]}),F.map(t=>e.jsxs("p",{className:"text-amber-600 ml-4",children:["• ",t.customer_name," — ",t.number_of_pax," pax (",t.status,")"]},t.id))]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:["👥 Staff (",(a.assigned_staff||[]).length," assigned)"]}),["head_waiter","service","extra","student"].map(t=>{const r=(a.assigned_staff||[]).filter(u=>u.role===t),l={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},o=ke(a.number_of_pax||60)[t]||0;return o===0&&r.length===0?null:e.jsxs("div",{className:"mb-2",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsxs("span",{className:"text-xs text-gray-400",children:[l[t]," (need ",o,")"]}),e.jsxs("span",{className:`text-xs font-medium ${r.length>=o?"text-green-600":"text-amber-600"}`,children:[r.length,"/",o]})]}),e.jsx("button",{onClick:()=>G(t),className:"w-full p-2.5 border-2 border-dashed border-gray-300 rounded-lg text-left hover:border-red-400 hover:bg-red-50",children:r.length>0?e.jsx("div",{className:"flex flex-wrap gap-1.5",children:r.map(u=>e.jsxs("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${(u.type||"regular")==="on_call"?"bg-orange-100 text-orange-700":"bg-red-100 text-red-700"}`,children:[u.name," ",(u.type||"regular")==="on_call"&&"📞"]},u.id))}):e.jsxs("span",{className:"text-gray-400 text-sm",children:["+ Select ",l[t]]})})]},t)})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:"📦 Equipment"}),e.jsx("div",{className:"space-y-1.5 max-h-60 overflow-y-auto",children:y.map(t=>{const r=(a.assigned_equipment||{})[t.id]||0,l=ye(t),o=(t.type||"owned")==="rental",u=be[t.id]||0;return e.jsxs("div",{className:"flex items-center justify-between py-1.5 border-b border-gray-100",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("p",{className:"font-medium text-gray-800 text-sm truncate",children:t.name}),o&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium shrink-0",children:"Rental"})]}),e.jsx("p",{className:"text-[11px] text-gray-400",children:o?`${t.supplier||"Supplier"} • ₱${(t.rental_cost||0).toLocaleString()}/unit`:`${l} free today${u>0?` (${u} on other events)`:""}`})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{onClick:()=>fe(t.id,r-1),disabled:r<=0,className:"w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-30 text-xs",children:e.jsx(gt,{size:12})}),e.jsx("span",{className:`w-7 text-center font-medium text-sm ${r>l&&!o?"text-red-600":""}`,children:r}),e.jsx("button",{onClick:()=>fe(t.id,r+1),disabled:!o&&r>=l,className:"w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 disabled:opacity-30 text-xs",children:e.jsx(ht,{size:12})})]})]},t.id)})})]}),(()=>{const t=a.assigned_staff||[],r=a.assigned_equipment||{},l=t.filter(b=>(b.type||"regular")==="on_call"),o=l.reduce((b,w)=>b+(w.daily_rate||0),0),u=y.filter(b=>(b.type||"owned")==="rental"&&r[b.id]).reduce((b,w)=>b+(r[w.id]||0)*(w.rental_cost||0),0),p=o+u;return p===0?null:e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3",children:[e.jsx("p",{className:"text-sm font-semibold text-blue-800 mb-1",children:"💰 Extra Costs"}),o>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["📞 On-Call Staff (",l.length,"): ₱",o.toLocaleString()]}),u>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["🏷️ Equipment Rental: ₱",u.toLocaleString()]}),e.jsxs("p",{className:"text-sm font-bold text-blue-800 mt-1 pt-1 border-t border-blue-200",children:["Total Additional: ₱",p.toLocaleString()]})]})})(),Q&&e.jsx("div",{className:"bg-amber-50 border border-amber-300 rounded-lg p-2 mb-3 text-center",children:e.jsx("p",{className:"text-sm font-medium text-amber-800",children:"Unsaved changes — click Save below"})}),e.jsxs("button",{onClick:Re,disabled:ce,className:`w-full py-3 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2 ${Q?"bg-amber-600 hover:bg-amber-700 animate-pulse":"bg-red-700 hover:bg-red-800"}`,children:[e.jsx(ae,{size:20})," ",ce?"Saving...":Q?"Save Assignment *":"Save Assignment"]})]})]})]}):e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-12 text-center",children:[e.jsx("div",{className:"w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(te,{size:40,className:"text-gray-400"})}),e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-2",children:"Select a Booking"}),e.jsx("p",{className:"text-gray-500",children:"Click on a booking to view and assign"})]})})]}),T&&e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e.jsxs("div",{className:"bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden",children:[e.jsxs("div",{className:"bg-red-700 text-white p-4 flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold",children:["Select ",{head_waiter:"Head Waiter",service:"Service Staff",extra:"Extra Staff",student:"Students"}[T]||"Staff"]}),e.jsx("button",{onClick:()=>{G(null),X("")},className:"p-1 hover:bg-red-800 rounded-full",children:e.jsx(De,{size:24})})]}),e.jsx("div",{className:"p-3 border-b",children:e.jsxs("div",{className:"relative",children:[e.jsx(Se,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",placeholder:"Search staff...",value:J,onChange:t=>X(t.target.value),className:"w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"})]})}),e.jsx("div",{className:"overflow-y-auto max-h-[55vh]",children:m.filter(t=>!(T==="head_waiter"&&t.role!=="head_waiter"||T==="service"&&t.role!=="service"&&t.role!=="extra"||T==="extra"&&t.role!=="extra"&&t.role!=="student"||T==="student"&&t.role!=="student"&&t.role!=="extra"||J&&!t.name.toLowerCase().includes(J.toLowerCase()))).sort((t,r)=>(t.type||"regular")==="regular"&&(r.type||"regular")!=="regular"?-1:(t.type||"regular")!=="regular"&&(r.type||"regular")==="regular"?1:t.name.localeCompare(r.name)).map(t=>{const r=((a==null?void 0:a.assigned_staff)||[]).some(p=>p.id===t.id),l=ve(t.id)&&!r,o=(t.type||"regular")==="on_call",u=!t.available||l;return e.jsxs("button",{onClick:()=>Be(t,T),disabled:u,className:`w-full p-4 flex items-center justify-between border-b border-gray-100 ${u?"opacity-40 cursor-not-allowed":"hover:bg-red-50"} ${r?"bg-red-50":""}`,children:[e.jsxs("div",{className:"text-left min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-medium text-gray-800 truncate",children:t.name}),o&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium",children:"📞 On-Call"}),!o&&e.jsx("span",{className:"px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[10px] font-medium",children:"Regular"})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[t.note&&e.jsx("p",{className:"text-xs text-gray-500",children:t.note}),o&&t.daily_rate>0&&e.jsxs("p",{className:"text-xs text-orange-500",children:["₱",t.daily_rate.toLocaleString(),"/day"]}),o&&t.phone&&e.jsx("p",{className:"text-xs text-gray-400",children:t.phone})]}),l&&e.jsxs("p",{className:"text-xs text-red-500 mt-0.5",children:["📅 Busy on ",a==null?void 0:a.event_date]}),!t.available&&!l&&e.jsx("p",{className:"text-xs text-red-500 mt-0.5",children:"Unavailable"})]}),r&&e.jsx(ft,{size:20,className:"text-red-700"})]},t.id)})}),e.jsx("div",{className:"p-4 border-t",children:e.jsx("button",{onClick:()=>{G(null),X("")},className:"w-full py-2 bg-red-700 text-white rounded-lg font-medium",children:"Done"})})]})}),Ae&&a&&e.jsx(_t,{booking:a,onClose:()=>de(!1),onSave:He})]})})}export{Qt as default};
