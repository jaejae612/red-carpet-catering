import{h as de,u as Te,r as h,m as qe,j as e,X as Ae,g as st,f as ne,M as Me,k as re,s as N,i as at,d as nt,L as rt,C as ke,b as $e,P as it,n as Ee}from"./index-b9XY7OdS.js";import{T as lt}from"./SkeletonLoaders-D9rZDt38.js";import{c as ot,l as V,e as dt,a as ct,P as mt,A as ut}from"./AuditTimeline-GPQaNPqw.js";import{A as pt}from"./alert-circle-BDBP1pIC.js";import{C as xt}from"./clock-Db0-M_pY.js";import{C as gt}from"./credit-card-BdG34bKq.js";import{S as ie}from"./save-DmQppoFw.js";import{A as ht}from"./arrow-left-Dw85xfPP.js";import{S as De}from"./search-I3p3eoIk.js";import{F as ft}from"./filter-BMLG69id.js";import{S as bt}from"./send-77XZKkN5.js";import{P as yt}from"./pen-BkBsM7dg.js";import{T as vt}from"./trash-2-ZC-Bdlr8.js";import{M as jt}from"./mail-DY0CmAaN.js";import{M as _t}from"./minus-DBSwVBJN.js";import{P as Nt}from"./plus-nO2FRXE4.js";import{C as wt}from"./check-gAwgj-pR.js";import"./alert-triangle-DhowK-0m.js";import"./plus-circle-BMNHOv-b.js";const Ct=de("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]),St=de("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),kt=de("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);function $t({booking:s,onClose:l,onSave:o}){var T;const{user:c,profile:p}=Te(),[r,g]=h.useState({customer_name:"",customer_phone:"",customer_email:"",venue:"",event_date:"",event_time:"",number_of_pax:60,motif:"",special_requests:"",status:"pending",payment_status:"unpaid",deposit_amount:0,payment_notes:"",total_amount:0}),[$,w]=h.useState(!1),[z,I]=h.useState(""),[Y,a]=h.useState("");h.useEffect(()=>{s&&g({customer_name:s.customer_name||"",customer_phone:s.customer_phone||"",customer_email:s.customer_email||"",venue:s.venue||"",event_date:s.event_date||"",event_time:s.event_time||"",number_of_pax:s.number_of_pax||60,motif:s.motif||"",special_requests:s.special_requests||"",status:s.status||"pending",payment_status:s.payment_status||"unpaid",deposit_amount:s.deposit_amount||0,payment_notes:s.payment_notes||"",total_amount:s.total_amount||0})},[s]);const j=async m=>{m.preventDefault(),w(!0),I(""),a("");try{const v={customer_name:r.customer_name,customer_phone:r.customer_phone,customer_email:r.customer_email,venue:r.venue,event_date:r.event_date,event_time:r.event_time,number_of_pax:r.number_of_pax,motif:r.motif,special_requests:r.special_requests,status:r.status,payment_status:r.payment_status,deposit_amount:r.deposit_amount,payment_notes:r.payment_notes,total_amount:r.total_amount};r.payment_status==="deposit_paid"&&!s.deposit_paid_at&&(v.deposit_paid_at=new Date().toISOString()),r.payment_status==="fully_paid"&&!s.balance_paid_at&&(v.balance_paid_at=new Date().toISOString()),v.modified_by=c==null?void 0:c.id;const{error:q}=await N.from("bookings").update(v).eq("id",s.id);if(q)throw q;const S=ot(s,v,["customer_name","customer_phone","customer_email","venue","event_date","event_time","number_of_pax","motif","special_requests","status","payment_status","deposit_amount","payment_notes","total_amount"]);S.length>0&&V({entityType:"booking",entityId:s.id,action:S.some(W=>W.field==="status")?"status_changed":"updated",adminId:c==null?void 0:c.id,adminName:p==null?void 0:p.full_name,changedFields:S}),a("Booking updated successfully!"),setTimeout(()=>{o==null||o(),l()},1e3)}catch(v){I(v.message||"Failed to update booking")}finally{w(!1)}},P=[];for(let m=6;m<=22;m++)["00","30"].forEach(v=>{const q=m>12?m-12:m===0?12:m,S=m>=12?"PM":"AM";P.push({value:`${m.toString().padStart(2,"0")}:${v}`,label:`${q}:${v} ${S}`})});const R=qe[s==null?void 0:s.menu_package];return e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold text-gray-800",children:"Edit Booking"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["#",(T=s==null?void 0:s.id)==null?void 0:T.slice(0,8)," • ",R==null?void 0:R.name]})]}),e.jsx("button",{onClick:l,className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(Ae,{size:20})})]}),e.jsxs("form",{onSubmit:j,className:"p-6 space-y-6",children:[z&&e.jsxs("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(pt,{size:20}),z]}),Y&&e.jsxs("div",{className:"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(st,{size:20}),Y]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Customer Information"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),e.jsx("input",{type:"text",value:r.customer_name,onChange:m=>g({...r,customer_name:m.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Phone"}),e.jsx("input",{type:"tel",value:r.customer_phone,onChange:m=>g({...r,customer_phone:m.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{type:"email",value:r.customer_email,onChange:m=>g({...r,customer_email:m.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Event Details"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Date"}),e.jsxs("div",{className:"relative",children:[e.jsx(ne,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"date",value:r.event_date,onChange:m=>g({...r,event_date:m.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Time"}),e.jsxs("div",{className:"relative",children:[e.jsx(xt,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("select",{value:r.event_time,onChange:m=>g({...r,event_time:m.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:P.map(m=>e.jsx("option",{value:m.value,children:m.label},m.value))})]})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Venue"}),e.jsxs("div",{className:"relative",children:[e.jsx(Me,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",value:r.venue,onChange:m=>g({...r,venue:m.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Number of Guests"}),e.jsxs("div",{className:"relative",children:[e.jsx(re,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"number",min:"30",value:r.number_of_pax,onChange:m=>g({...r,number_of_pax:parseInt(m.target.value)}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Total Amount (₱)"}),e.jsx("input",{type:"number",value:r.total_amount,onChange:m=>g({...r,total_amount:parseInt(m.target.value)}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Status & Payment"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Booking Status"}),e.jsxs("select",{value:r.status,onChange:m=>g({...r,status:m.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Status"}),e.jsxs("div",{className:"relative",children:[e.jsx(gt,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsxs("select",{value:r.payment_status,onChange:m=>g({...r,payment_status:m.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Deposit Amount (₱)"}),e.jsx("input",{type:"number",value:r.deposit_amount,onChange:m=>g({...r,deposit_amount:parseInt(m.target.value)||0}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Balance Due"}),e.jsxs("div",{className:"px-4 py-2 bg-gray-100 rounded-lg font-semibold text-red-700",children:["₱",(r.total_amount-r.deposit_amount).toLocaleString()]})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Other Details"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Motif/Theme"}),e.jsx("input",{type:"text",value:r.motif,onChange:m=>g({...r,motif:m.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Special Requests"}),e.jsx("textarea",{value:r.special_requests,onChange:m=>g({...r,special_requests:m.target.value}),rows:2,className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Notes"}),e.jsx("textarea",{value:r.payment_notes,onChange:m=>g({...r,payment_notes:m.target.value}),rows:2,placeholder:"e.g., GCash payment received, reference #12345",className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{className:"flex gap-3 pt-4 border-t",children:[e.jsxs("button",{type:"submit",disabled:$,className:"flex-1 bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2",children:[e.jsx(ie,{size:18})," ",$?"Saving...":"Save Changes"]}),e.jsx("button",{type:"button",onClick:l,className:"px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50",children:"Cancel"})]})]})]})})}const le=async({to:s,subject:l,html:o})=>{if(!s||!l||!o)return{success:!1,error:"Missing required fields"};try{const{data:{session:c}}=await N.auth.getSession(),p=await fetch("https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-email",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(c==null?void 0:c.access_token)||""}`},body:JSON.stringify({to:s,subject:l,html:o})}),r=await p.json();return p.ok?{success:!0,data:r}:(console.error("Email error:",r),{success:!1,error:r.error||"Failed to send email"})}catch(c){return console.error("Email error:",c),{success:!1,error:c.message}}},M=s=>`₱${(s==null?void 0:s.toLocaleString())||0}`,D=s=>s?new Date(s).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"",H=s=>{if(!s)return"";const[l,o]=s.split(":"),c=parseInt(l),p=c>=12?"PM":"AM";return`${c>12?c-12:c===0?12:c}:${o} ${p}`},oe={newBookingCustomer:s=>{var l,o;return{subject:`Booking Confirmed - Red Carpet Catering #${(l=s.id)==null?void 0:l.slice(0,8)}`,html:`
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
                <span>#${(o=s.id)==null?void 0:o.slice(0,8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span>${D(s.event_date)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Time:</span>
                <span>${H(s.event_time)}</span>
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
                Total: ${M(s.total_amount)}
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
    `}},newBookingAdmin:s=>({subject:`🔔 New Booking Received - ${s.customer_name} - ${D(s.event_date)}`,html:`
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
              <div class="detail-row"><span class="label">📅 Date:</span> ${D(s.event_date)}</div>
              <div class="detail-row"><span class="label">🕐 Time:</span> ${H(s.event_time)}</div>
              <div class="detail-row"><span class="label">📍 Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="label">🍽️ Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="label">👥 Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="label">📞 Phone:</span> ${s.customer_phone}</div>
              <div class="detail-row"><span class="label">📧 Email:</span> ${s.customer_email||"N/A"}</div>
              ${s.motif?`<div class="detail-row"><span class="label">🎨 Motif:</span> ${s.motif}</div>`:""}
              ${s.special_requests?`<div class="detail-row"><span class="label">📝 Notes:</span> ${s.special_requests}</div>`:""}
              <div class="total">Total: ${M(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/bookings" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}),newFoodOrderCustomer:s=>{var l,o,c;return{subject:`Order Confirmed - Red Carpet Catering #${(l=s.id)==null?void 0:l.slice(0,8)}`,html:`
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
              <p><strong>Order ID:</strong> #${(o=s.id)==null?void 0:o.slice(0,8).toUpperCase()}</p>
              <p><strong>Delivery Date:</strong> ${D(s.delivery_date)}</p>
              <p><strong>Delivery Time:</strong> ${H(s.delivery_time)||"To be confirmed"}</p>
              <p><strong>Delivery Address:</strong> ${s.delivery_address}</p>
              
              <h4 style="margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h4>
              ${((c=s.items)==null?void 0:c.map(p=>`
                <div class="item">
                  <span>${p.name} × ${p.quantity}</span>
                  <span>${M(p.price*p.quantity)}</span>
                </div>
              `).join(""))||""}
              
              <div class="total">
                Total: ${M(s.total_amount)}
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
    `}},newFoodOrderAdmin:s=>{var l;return{subject:`🛒 New Food Order - ${s.customer_name} - ${D(s.delivery_date)}`,html:`
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
              <p><strong>📅 Delivery:</strong> ${D(s.delivery_date)} ${s.delivery_time?`at ${H(s.delivery_time)}`:""}</p>
              <p><strong>📍 Address:</strong> ${s.delivery_address}</p>
              <p><strong>📞 Phone:</strong> ${s.customer_phone}</p>
              
              <h4>Items:</h4>
              ${((l=s.items)==null?void 0:l.map(o=>`
                <div class="item">${o.name} × ${o.quantity} - ${M(o.price*o.quantity)}</div>
              `).join(""))||""}
              
              <div class="total">Total: ${M(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/food-orders" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}},eventReminder:(s,l)=>({subject:`Reminder: Your Event is in ${l} Day${l!==1?"s":""} - Red Carpet Catering`,html:`
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

            <div class="countdown">${l} day${l!==1?"s":""} to go!</div>

            <div class="booking-details">
              <div class="detail-row"><span class="detail-label">Event Date:</span> ${D(s.event_date)}</div>
              <div class="detail-row"><span class="detail-label">Time:</span> ${H(s.event_time)}</div>
              <div class="detail-row"><span class="detail-label">Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="detail-label">Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="detail-label">Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="detail-label">Total:</span> ${M(s.total_amount)}</div>
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
    `}),bookingStatusUpdate:(s,l)=>({subject:`Booking ${l.charAt(0).toUpperCase()+l.slice(1)} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${l==="confirmed"?"#059669":l==="cancelled"?"#dc2626":"#b91c1c"}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; background: ${l==="confirmed"?"#d1fae5":l==="cancelled"?"#fee2e2":"#fef3c7"}; color: ${l==="confirmed"?"#059669":l==="cancelled"?"#dc2626":"#d97706"}; }
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
              <span class="status-badge">${l.toUpperCase()}</span>
            </p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Event Date: ${D(s.event_date)}</li>
              <li>Venue: ${s.venue}</li>
              <li>Guests: ${s.number_of_pax} pax</li>
            </ul>
            ${l==="confirmed"?"<p>We look forward to serving you!</p>":""}
            ${l==="cancelled"?"<p>If you have any questions, please contact us.</p>":""}
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `})},Et=async(s,l="redcarpetbookings@gmail.com")=>{const o={customer:null,admin:null};if(s.customer_email){const p=oe.newBookingCustomer(s);o.customer=await le({to:s.customer_email,subject:p.subject,html:p.html})}const c=oe.newBookingAdmin(s);return o.admin=await le({to:l,subject:c.subject,html:c.html}),o},Dt=async s=>{if(!s.customer_email)return{success:!1,error:"No customer email"};const l=Math.ceil((new Date(s.event_date)-new Date)/(1e3*60*60*24)),o=oe.eventReminder(s,Math.max(l,0));return await le({to:s.customer_email,subject:o.subject,html:o.html})},Pt=[{maxPax:60,tier:"60"},{maxPax:80,tier:"80"},{maxPax:100,tier:"100"},{maxPax:1/0,tier:"150"}],Tt={"dinner plate":{60:80,80:100,100:120,150:170},"dessert plate":{60:80,80:100,100:120,150:170},"soup bowl":{60:60,80:80,100:100,150:150},"spoon & fork":{60:80,80:100,100:120,150:170},"water glass":{60:66,80:88,100:110,150:165},teaspoon:{60:40,80:40,100:40,150:80},goblet:{60:50,80:50,100:75,150:100},"serving spoon":{60:7,80:7,100:7,150:7},pitcher:{60:2,80:3,100:3,150:4},"ice bucket":{60:4,80:6,100:6,150:8},"ice tong":{60:8,80:8,100:8,150:12},"serving tray":{60:3,80:3,100:4,150:6},"lechon tray":{60:1,80:1,100:1,150:1}},qt=s=>{for(const l of Pt)if(s<=l.maxPax)return l.tier;return"150"},At=(s,l=8)=>{s=Math.max(s||0,30);const o=qt(s),c=Math.ceil(s/10),p=s<=80?2:s<=120?3:4,r=c+p,g=Math.ceil(s*1.1),$=Math.min(Math.max(l,6),12),w={};for(const[z,I]of Object.entries(Tt))w[z]=I[o]||0;return{...w,"round table":c,"guest chair":g,"chair cover":g,"buffet table":p,"chafing dish":$,"serving tong":$,"table cloth":r,"table napkin":s,"table skirting":p}},Pe=s=>(s=Math.max(s||0,30),{head_waiter:s>=150?2:1,service:Math.max(Math.ceil(s/10),3),extra:Math.max(Math.ceil(s/25),1),student:Math.max(Math.ceil(s/30),1)}),Mt=(s,l,o)=>{const c={},p=[];return s.filter(r=>r.event_date===l&&r.id!==o&&r.status!=="cancelled").forEach(r=>{if(r.assigned_equipment)for(const[g,$]of Object.entries(r.assigned_equipment))c[g]=(c[g]||0)+$;r.assigned_staff&&r.assigned_staff.forEach(g=>{p.includes(g.id)||p.push(g.id)})}),{usedEquipment:c,busyStaffIds:p}},zt=(s,l)=>{if(l){let c=0;if(Array.isArray(l.menu_items)&&(c+=l.menu_items.length),Array.isArray(l.custom_dishes)&&(c+=l.custom_dishes.length),c>0)return Math.max(c,6)}return{menu470:7,menu510:9,menu560:10,menu620:11,menu660:11,menu680:12,menu810:12,cocktail:8}[s]||8};function ss(){var Se;const[s]=at(),l=nt(),{user:o,profile:c}=Te(),[p,r]=h.useState([]),[g,$]=h.useState([]),[w,z]=h.useState([]),[I,Y]=h.useState(!0),[a,j]=h.useState(null),[P,R]=h.useState(""),[T,m]=h.useState(s.get("status")||"all"),[v,q]=h.useState(s.get("payment")||"all"),[S,W]=h.useState(""),[G,ce]=h.useState(""),[me,ze]=h.useState("asc"),[J,Ie]=h.useState(!!(s.get("status")||s.get("payment"))),[A,X]=h.useState(null),[Re,ue]=h.useState(!1),[pe,xe]=h.useState(!1),[ge,he]=h.useState(!1),[fe,be]=h.useState(!1),[K,L]=h.useState(!1),[Z,ee]=h.useState(""),[te,Be]=h.useState(!1);h.useEffect(()=>{ye()},[]),h.useEffect(()=>{const t=s.get("booking");if(t&&p.length>0){const n=p.find(i=>i.id===t);n&&j(n)}},[p,s]);const ye=async()=>{try{const[t,n,i]=await Promise.all([N.from("bookings").select("*").order("event_date",{ascending:!0}),N.from("staff").select("*").order("name"),N.from("equipment").select("*").order("category, name")]);r(t.data||[]),$(n.data||[]),z(i.data||[])}catch(t){console.error("Error:",t)}finally{Y(!1)}},Fe=async(t,n)=>{const i=p.find(x=>x.id===t);if(!i||n==="completed"&&(!i.payment_status||i.payment_status==="unpaid")&&!window.confirm(`⚠️ This booking has NO payments recorded.

Are you sure you want to mark it as completed without any payment?

Tip: Record a payment first using the Payment section below.`))return;if(n==="completed"&&i.payment_status==="deposit_paid"){const x=(i.total_amount||0)-(i.amount_paid||0);if(!window.confirm(`⚠️ This booking still has a balance of ₱${x.toLocaleString()}.

Are you sure you want to mark it as completed?

The balance will still be tracked in the payment section.`))return}if(n==="cancelled"&&i.status!=="cancelled"){const b=i.amount_paid>0||i.payment_status==="deposit_paid"||i.payment_status==="fully_paid"?`⚠️ This booking has payments recorded.

Cancelling will change payment status to "Refund Pending".

Are you sure?`:"Are you sure you want to cancel this booking?";if(!window.confirm(b))return}const d=i.status;await N.from("bookings").update({status:n,modified_by:o==null?void 0:o.id}).eq("id",t);const{data:u}=await N.from("bookings").select("*").eq("id",t).single();u&&(r(x=>x.map(b=>b.id===t?u:b)),(a==null?void 0:a.id)===t&&j(u)),V({entityType:"booking",entityId:t,action:"status_changed",adminId:o==null?void 0:o.id,adminName:c==null?void 0:c.full_name,changedFields:[{field:"status",old:d,new:n}]})},Le=async()=>{if(a){xe(!0);try{const t={assigned_staff:a.assigned_staff,assigned_equipment:a.assigned_equipment,modified_by:o==null?void 0:o.id};a.status==="pending"&&(t.status="confirmed"),await N.from("bookings").update(t).eq("id",a.id),a.status==="pending"&&(a.status="confirmed"),r(n=>n.map(i=>i.id===a.id?a:i)),L(!1),alert("Saved!"),V({entityType:"booking",entityId:a.id,action:"updated",adminId:o==null?void 0:o.id,adminName:c==null?void 0:c.full_name,description:"Staff and equipment assignment updated"})}catch{alert("Error saving")}finally{xe(!1)}}},Oe=(t,n)=>{if(!a)return;const i=a.assigned_staff||[],u=i.find(x=>x.id===t.id)?i.filter(x=>x.id!==t.id):[...i,{id:t.id,name:t.name,role:n,type:t.type||"regular",daily_rate:t.daily_rate||0,phone:t.phone}];j({...a,assigned_staff:u}),L(!0)},ve=(t,n)=>{if(!a)return;const i=a.assigned_equipment||{};if(n<=0){const{[t]:d,...u}=i;j({...a,assigned_equipment:u})}else j({...a,assigned_equipment:{...i,[t]:n}});L(!0)},Ue=()=>a?Mt(p,a.event_date,a.id):{usedEquipment:{},busyStaffIds:[]},{usedEquipment:je,busyStaffIds:He}=a?Ue():{usedEquipment:{},busyStaffIds:[]},O=a?p.filter(t=>t.event_date===a.event_date&&t.id!==a.id&&t.status!=="cancelled"):[],_e=t=>Math.max((t.quantity||0)-(je[t.id]||0),0),Ne=t=>He.includes(t),Ve=()=>{if(!a)return;const t=a.number_of_pax||60,n=zt(a.menu_package,a),i=Pe(t),d=[];for(const[f,_]of Object.entries(i)){const k=g.filter(y=>(y.role===f||f==="extra"&&y.role==="student"||f==="student"&&y.role==="extra")&&y.available!==!1&&!Ne(y.id));k.sort((y,F)=>(y.type||"regular")==="regular"&&(F.type||"regular")!=="regular"?-1:(y.type||"regular")!=="regular"&&(F.type||"regular")==="regular"?1:(y.daily_rate||0)-(F.daily_rate||0)),k.slice(0,_).forEach(y=>{d.push({id:y.id,name:y.name,role:f,type:y.type||"regular",daily_rate:y.daily_rate||0,phone:y.phone})})}const u=At(t,n),x={};w.forEach(f=>{const _=(f.name||"").toLowerCase().trim();if(u[_]!==void 0){const k=_e(f),y=Math.min(u[_],k);y>0&&(x[f.id]=y)}}),j({...a,assigned_staff:d,assigned_equipment:x}),L(!0);const b=d.filter(f=>f.type==="on_call").length,C=d.filter(f=>f.type==="on_call").reduce((f,_)=>f+(_.daily_rate||0),0),Q=w.filter(f=>(f.type||"owned")==="rental"&&x[f.id]).reduce((f,_)=>f+(x[_.id]||0)*(_.rental_cost||0),0),tt={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},se=[];for(const[f,_]of Object.entries(i)){const k=d.filter(y=>y.role===f).length;k<_&&se.push(`${tt[f]}: ${k}/${_}`)}const ae=[];for(const[f,_]of Object.entries(u)){const k=w.find(F=>(F.name||"").toLowerCase().trim()===f),y=k&&x[k.id]||0;y<_&&ae.push(`${f}: ${y}/${_}`)}let E=`✅ Auto-assigned for ${t} guests:

`;E+=`👥 Staff: ${d.length} total`,b>0&&(E+=` (${b} on-call = ₱${C.toLocaleString()})`),E+=`
📦 Equipment: ${Object.keys(x).length} items`,Q>0&&(E+=` (rentals = ₱${Q.toLocaleString()})`),se.length>0&&(E+=`

⚠️ Staff shortages:
${se.join(`
`)}`),ae.length>0&&(E+=`

⚠️ Equipment shortages:
${ae.join(`
`)}`),O.length>0&&(E+=`

📅 ${O.length} other booking(s) on same date — availability adjusted`),E+=`

Review below and click Save when ready.`,alert(E)},we=t=>({pending:"bg-amber-100 text-amber-700",confirmed:"bg-blue-100 text-blue-700",completed:"bg-green-100 text-green-700",cancelled:"bg-red-100 text-red-700"})[t]||"bg-gray-100 text-gray-700",Ye=t=>({unpaid:"bg-red-100 text-red-700",deposit_paid:"bg-amber-100 text-amber-700",fully_paid:"bg-green-100 text-green-700",refund_pending:"bg-orange-100 text-orange-700",refunded:"bg-gray-100 text-gray-700"})[t]||"bg-gray-100 text-gray-700",We=t=>({unpaid:"Unpaid",deposit_paid:"Deposit Paid",fully_paid:"Fully Paid",refund_pending:"Refund Pending",refunded:"Refunded"})[t]||"Unknown",Ge=()=>{ye(),a&&N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&j(t)})},Qe=async()=>{var n,i;if(!a)return;if(!a.customer_email){alert("No customer email address");return}if(window.confirm(`Send booking confirmation email to ${a.customer_email}?`)){he(!0);try{const d=await Et(a);(n=d.customer)!=null&&n.success||(i=d.admin)!=null&&i.success?alert("Email sent successfully!"):alert("Failed to send email. Check console for details.")}catch(d){console.error("Email error:",d),alert("Error sending email: "+d.message)}finally{he(!1)}}},Je=()=>{if(!a)return;const t={...a,id:void 0,event_date:"",status:"pending",payment_status:"unpaid",deposit_amount:0};sessionStorage.setItem("duplicateBooking",JSON.stringify(t)),l("/book?duplicate=true")},Xe=async()=>{if(!a)return;if(!a.customer_email){alert("No email address on file.");return}if(Math.ceil((new Date(a.event_date)-new Date)/(1e3*60*60*24))<0){alert("This event has already passed.");return}be(!0);try{const n=await Dt(a);alert(n.success?`Reminder sent to ${a.customer_email}!`:"Failed: "+n.error)}catch(n){alert("Error: "+n.message)}finally{be(!1)}},Ke=async t=>{if(!a)return;await N.from("bookings").update({expenses:t,modified_by:o==null?void 0:o.id}).eq("id",a.id);const n={...a,expenses:t};j(n),r(i=>i.map(d=>d.id===n.id?n:d)),V({entityType:"booking",entityId:a.id,action:"updated",adminId:o==null?void 0:o.id,adminName:c==null?void 0:c.full_name,changedFields:[{field:"expenses",old:a.expenses,new:t}]})},Ze=async()=>{if(!a)return;const n=(a.amount_paid||0)>0?`⚠️ "${a.customer_name}" has ₱${a.amount_paid.toLocaleString()} in payments.

This will permanently delete the booking and all payment records.

Are you sure?`:`Delete booking for "${a.customer_name}" on ${a.event_date}?

This action cannot be undone.`;if(!window.confirm(n))return;const i={...a},{error:d}=await N.from("bookings").delete().eq("id",a.id);d?alert("Error deleting booking: "+d.message):(r(u=>u.filter(x=>x.id!==a.id)),j(null),V({entityType:"booking",entityId:i.id,action:"deleted",adminId:o==null?void 0:o.id,adminName:c==null?void 0:c.full_name,description:`Booking for "${i.customer_name}" on ${i.event_date} deleted`}))},et=()=>{R(""),m("all"),q("all"),W(""),ce("")},Ce=[T!=="all",v!=="all",S!=="",G!==""].filter(Boolean).length,B=p.filter(t=>{var b,C,U;const n=((b=t.customer_name)==null?void 0:b.toLowerCase().includes(P.toLowerCase()))||((C=t.venue)==null?void 0:C.toLowerCase().includes(P.toLowerCase()))||((U=t.customer_phone)==null?void 0:U.includes(P)),i=T==="all"||t.status===T,d=v==="all"||t.payment_status===v||v==="unpaid"&&!t.payment_status,u=!S||t.event_date>=S,x=!G||t.event_date<=G;return n&&i&&d&&u&&x}).sort((t,n)=>{const i=new Date(t.event_date),d=new Date(n.event_date);return me==="asc"?i-d:d-i});return I?e.jsx(lt,{rows:8,cols:5}):e.jsx("div",{className:"py-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(rt,{to:"/admin",className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(ht,{size:24})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:"Manage Bookings"}),e.jsx("p",{className:"text-gray-500",children:"Assign staff and equipment"})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:()=>dt(B),className:"flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"Excel"]}),e.jsxs("button",{onClick:()=>ct(B),className:"flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"PDF"]})]})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-4 sticky top-24",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"relative mb-3",children:[e.jsx(De,{className:"absolute left-3 top-2.5 text-gray-400",size:20}),e.jsx("input",{type:"text",placeholder:"Search name, venue, phone...",value:P,onChange:t=>R(t.target.value),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("button",{onClick:()=>Ie(!J),className:"w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(ft,{size:16})," Filters ",Ce>0&&e.jsx("span",{className:"bg-red-700 text-white px-2 py-0.5 rounded-full text-xs",children:Ce})]}),J?e.jsx(ke,{size:16}):e.jsx($e,{size:16})]}),J&&e.jsxs("div",{className:"mt-3 p-3 bg-gray-50 rounded-lg space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:T,onChange:t=>m(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]}),e.jsxs("select",{value:v,onChange:t=>q(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Payment"}),e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refund_pending",children:"Refund Pending"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Date Range"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("input",{type:"date",value:S,onChange:t=>W(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"From"}),e.jsx("input",{type:"date",value:G,onChange:t=>ce(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"To"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:me,onChange:t=>ze(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"asc",children:"Date ↑ Soonest"}),e.jsx("option",{value:"desc",children:"Date ↓ Latest"})]}),e.jsx("button",{onClick:et,className:"px-3 py-2 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-50",children:"Clear All"})]})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-2",children:[B.length," booking",B.length!==1?"s":""," found"]}),e.jsxs("div",{className:"space-y-2 max-h-[60vh] overflow-y-auto",children:[B.map(t=>{var n;return e.jsxs("button",{onClick:()=>{j(t),L(!1)},className:`w-full p-3 rounded-xl text-left ${(a==null?void 0:a.id)===t.id?"bg-red-50 border-2 border-red-700":"bg-gray-50 hover:bg-gray-100 border-2 border-transparent"}`,children:[e.jsxs("div",{className:"flex justify-between items-start mb-1",children:[e.jsx("span",{className:"font-medium text-gray-800 truncate",children:t.customer_name}),e.jsxs("div",{className:"flex items-center gap-1",children:[t.status==="completed"&&(!t.payment_status||t.payment_status==="unpaid")&&e.jsx("span",{title:"Completed but unpaid",className:"text-red-500 text-xs",children:"⚠️"}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${we(t.status)}`,children:t.status})]})]}),e.jsx("p",{className:"text-sm text-gray-500",children:t.event_date}),e.jsxs("div",{className:"flex items-center justify-between mt-1",children:[e.jsxs("span",{className:"text-sm text-gray-500",children:[t.number_of_pax," pax • ₱",(n=t.total_amount)==null?void 0:n.toLocaleString()]}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${Ye(t.payment_status)}`,children:We(t.payment_status)})]})]},t.id)}),B.length===0&&e.jsx("p",{className:"text-center text-gray-500 py-4",children:"No bookings found"})]})]})}),e.jsx("div",{className:"lg:col-span-2",children:a?e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-red-700 to-red-800 text-white p-6",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:a.customer_name}),e.jsxs("p",{className:"text-red-200",children:[(Se=qe[a.menu_package])==null?void 0:Se.name," • ",a.menu_option]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[e.jsxs("button",{onClick:Je,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(St,{size:14})," Duplicate"]}),e.jsxs("button",{onClick:Qe,disabled:ge,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(bt,{size:14})," ",ge?"Sending...":"Email"]}),e.jsxs("button",{onClick:Xe,disabled:fe,className:"bg-white/20 hover:bg-amber-500 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(Ct,{size:14})," ",fe?"Sending...":"Remind"]}),e.jsxs("button",{onClick:()=>ue(!0),className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(yt,{size:14})," Edit"]}),e.jsxs("button",{onClick:Ze,className:"bg-white/20 hover:bg-red-500 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(vt,{size:14})," Delete"]}),e.jsxs("select",{value:a.status,onChange:t=>Fe(a.id,t.target.value),className:"bg-white/20 text-white border-0 rounded-lg px-3 py-1 text-sm",children:[e.jsx("option",{value:"pending",className:"text-gray-800",children:"Pending"}),e.jsx("option",{value:"confirmed",className:"text-gray-800",children:"Confirmed"}),e.jsx("option",{value:"completed",className:"text-gray-800",children:"Completed"}),e.jsx("option",{value:"cancelled",className:"text-gray-800",children:"Cancelled"})]})]})]})}),e.jsxs("div",{className:"p-6 space-y-6",children:[a.status==="completed"&&(!a.payment_status||a.payment_status==="unpaid")&&e.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"⚠️"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-red-800",children:"Completed but Unpaid"}),e.jsx("p",{className:"text-xs text-red-600",children:"This booking is marked as completed but has no payments recorded. Record a payment below."})]})]}),a.status==="completed"&&a.payment_status==="deposit_paid"&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"💰"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-amber-800",children:"Balance Remaining"}),e.jsxs("p",{className:"text-xs text-amber-600",children:["Event completed with ₱",Math.max((a.total_amount||0)-(a.amount_paid||0),0).toLocaleString()," balance outstanding."]})]})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Event"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(ne,{size:16,className:"text-gray-400 mt-0.5"}),a.event_date," at ",a.event_time]}),e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(Me,{size:16,className:"text-gray-400 mt-0.5"}),a.venue]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(re,{size:16,className:"text-gray-400"}),a.number_of_pax," guests"]}),a.motif&&e.jsxs("p",{children:["🎨 ",a.motif]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Contact"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(it,{size:16,className:"text-gray-400"}),a.customer_phone]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(jt,{size:16,className:"text-gray-400"}),a.customer_email]})]})]})]}),e.jsx(mt,{bookingId:a.id,totalAmount:a.total_amount||0,currentStatus:a.payment_status,onStatusChange:()=>{N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&(j(t),r(n=>n.map(i=>i.id===t.id?t:i)))})}}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("button",{onClick:()=>Be(!te),className:"w-full flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold text-gray-700 flex items-center gap-2",children:[e.jsx(kt,{size:18})," Expense Tracking & Profit"]}),te?e.jsx(ke,{size:18,className:"text-gray-400"}):e.jsx($e,{size:18,className:"text-gray-400"})]}),te&&(()=>{const t=a.expenses||{},n=(t.food_cost||0)+(t.staff_cost||0)+(t.rental_cost||0)+(t.transport_cost||0)+(t.other_cost||0),i=a.total_amount||0,d=i-n,u=i>0?(d/i*100).toFixed(1):0;return e.jsxs("div",{className:"mt-3 space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[[{key:"food_cost",label:"Food & Ingredients",icon:"🍖"},{key:"staff_cost",label:"Staff Wages",icon:"👥"},{key:"rental_cost",label:"Equipment Rental",icon:"📦"},{key:"transport_cost",label:"Transport & Gas",icon:"🚛"},{key:"other_cost",label:"Other Costs",icon:"📋"}].map(({key:x,label:b,icon:C})=>e.jsxs("div",{children:[e.jsxs("label",{className:"text-xs text-gray-500 mb-1 block",children:[C," ",b]}),e.jsx("input",{type:"number",min:"0",value:t[x]||"",placeholder:"0",onChange:U=>{const Q={...t,[x]:parseInt(U.target.value)||0};j({...a,expenses:Q})},className:"w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"})]},x)),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"📝 Notes"}),e.jsx("input",{type:"text",value:t.notes||"",placeholder:"Expense notes...",onChange:x=>{const b={...t,notes:x.target.value};j({...a,expenses:b})},className:"w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"})]})]}),e.jsx("div",{className:`rounded-lg p-3 ${d>=0?"bg-green-50 border border-green-200":"bg-red-50 border border-red-200"}`,children:e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-xs",children:"Revenue"}),e.jsxs("p",{className:"font-bold text-gray-800",children:["₱",i.toLocaleString()]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-xs",children:"Expenses"}),e.jsxs("p",{className:"font-bold text-red-600",children:["₱",n.toLocaleString()]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-gray-500 text-xs",children:["Profit (",u,"%)"]}),e.jsxs("p",{className:`font-bold ${d>=0?"text-green-600":"text-red-600"}`,children:["₱",d.toLocaleString()]})]})]})}),e.jsxs("button",{onClick:()=>Ke(a.expenses||{}),className:"w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2",children:[e.jsx(ie,{size:16})," Save Expenses"]})]})})()]}),a.review_rating&&e.jsxs("div",{className:"bg-amber-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-amber-800 mb-2 flex items-center gap-2",children:[e.jsx(Ee,{size:18})," Customer Review"]}),e.jsxs("div",{className:"flex items-center gap-1 mb-1",children:[[1,2,3,4,5].map(t=>e.jsx(Ee,{size:18,className:t<=a.review_rating?"text-amber-400 fill-amber-400":"text-gray-300"},t)),e.jsxs("span",{className:"text-sm text-gray-600 ml-2",children:[a.review_rating,"/5"]})]}),a.review_comment&&e.jsx("p",{className:"text-sm text-gray-700",children:a.review_comment})]}),e.jsx(ut,{entityType:"booking",entityId:a.id}),(()=>{const t=p.filter(n=>n.id!==a.id&&(n.customer_name===a.customer_name||n.customer_phone===a.customer_phone));return t.length===0?null:e.jsxs("div",{className:"bg-purple-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-purple-800 mb-3 flex items-center gap-2",children:[e.jsx(re,{size:18})," Customer History (",t.length," previous)"]}),e.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto",children:t.slice(0,5).map(n=>{var i;return e.jsxs("div",{className:"flex items-center justify-between p-2 bg-white rounded-lg text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-gray-800",children:n.event_date}),e.jsxs("p",{className:"text-xs text-gray-500",children:[n.venue," • ",n.number_of_pax," pax"]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"font-medium text-gray-800",children:["₱",(i=n.total_amount)==null?void 0:i.toLocaleString()]}),e.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full ${we(n.status)}`,children:n.status})]})]},n.id)})}),t.length>5&&e.jsxs("p",{className:"text-xs text-purple-600 mt-2 text-center",children:["+",t.length-5," more bookings"]})]})})(),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"font-semibold text-gray-700",children:"Assign Staff & Equipment"}),e.jsxs("button",{onClick:Ve,className:"px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5",children:["⚡ Auto-Assign (",a.number_of_pax," pax)"]})]}),O.length>0&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 text-xs",children:[e.jsxs("p",{className:"font-medium text-amber-800",children:["📅 ",O.length," other booking(s) on ",a.event_date,":"]}),O.map(t=>e.jsxs("p",{className:"text-amber-600 ml-4",children:["• ",t.customer_name," — ",t.number_of_pax," pax (",t.status,")"]},t.id))]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:["👥 Staff (",(a.assigned_staff||[]).length," assigned)"]}),["head_waiter","service","extra","student"].map(t=>{const n=(a.assigned_staff||[]).filter(u=>u.role===t),i={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},d=Pe(a.number_of_pax||60)[t]||0;return d===0&&n.length===0?null:e.jsxs("div",{className:"mb-2",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsxs("span",{className:"text-xs text-gray-400",children:[i[t]," (need ",d,")"]}),e.jsxs("span",{className:`text-xs font-medium ${n.length>=d?"text-green-600":"text-amber-600"}`,children:[n.length,"/",d]})]}),e.jsx("button",{onClick:()=>X(t),className:"w-full p-2.5 border-2 border-dashed border-gray-300 rounded-lg text-left hover:border-red-400 hover:bg-red-50",children:n.length>0?e.jsx("div",{className:"flex flex-wrap gap-1.5",children:n.map(u=>e.jsxs("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${(u.type||"regular")==="on_call"?"bg-orange-100 text-orange-700":"bg-red-100 text-red-700"}`,children:[u.name," ",(u.type||"regular")==="on_call"&&"📞"]},u.id))}):e.jsxs("span",{className:"text-gray-400 text-sm",children:["+ Select ",i[t]]})})]},t)})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:"📦 Equipment"}),e.jsx("div",{className:"space-y-1.5 max-h-60 overflow-y-auto",children:w.map(t=>{const n=(a.assigned_equipment||{})[t.id]||0,i=_e(t),d=(t.type||"owned")==="rental",u=je[t.id]||0;return e.jsxs("div",{className:"flex items-center justify-between py-1.5 border-b border-gray-100",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("p",{className:"font-medium text-gray-800 text-sm truncate",children:t.name}),d&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium shrink-0",children:"Rental"})]}),e.jsx("p",{className:"text-[11px] text-gray-400",children:d?`${t.supplier||"Supplier"} • ₱${(t.rental_cost||0).toLocaleString()}/unit`:`${i} free today${u>0?` (${u} on other events)`:""}`})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{onClick:()=>ve(t.id,n-1),disabled:n<=0,className:"w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-30 text-xs",children:e.jsx(_t,{size:12})}),e.jsx("span",{className:`w-7 text-center font-medium text-sm ${n>i&&!d?"text-red-600":""}`,children:n}),e.jsx("button",{onClick:()=>ve(t.id,n+1),disabled:!d&&n>=i,className:"w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 disabled:opacity-30 text-xs",children:e.jsx(Nt,{size:12})})]})]},t.id)})})]}),(()=>{const t=a.assigned_staff||[],n=a.assigned_equipment||{},i=t.filter(b=>(b.type||"regular")==="on_call"),d=i.reduce((b,C)=>b+(C.daily_rate||0),0),u=w.filter(b=>(b.type||"owned")==="rental"&&n[b.id]).reduce((b,C)=>b+(n[C.id]||0)*(C.rental_cost||0),0),x=d+u;return x===0?null:e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3",children:[e.jsx("p",{className:"text-sm font-semibold text-blue-800 mb-1",children:"💰 Extra Costs"}),d>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["📞 On-Call Staff (",i.length,"): ₱",d.toLocaleString()]}),u>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["🏷️ Equipment Rental: ₱",u.toLocaleString()]}),e.jsxs("p",{className:"text-sm font-bold text-blue-800 mt-1 pt-1 border-t border-blue-200",children:["Total Additional: ₱",x.toLocaleString()]})]})})(),K&&e.jsx("div",{className:"bg-amber-50 border border-amber-300 rounded-lg p-2 mb-3 text-center",children:e.jsx("p",{className:"text-sm font-medium text-amber-800",children:"Unsaved changes — click Save below"})}),e.jsxs("button",{onClick:Le,disabled:pe,className:`w-full py-3 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2 ${K?"bg-amber-600 hover:bg-amber-700 animate-pulse":"bg-red-700 hover:bg-red-800"}`,children:[e.jsx(ie,{size:20})," ",pe?"Saving...":K?"Save Assignment *":"Save Assignment"]})]})]})]}):e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-12 text-center",children:[e.jsx("div",{className:"w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(ne,{size:40,className:"text-gray-400"})}),e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-2",children:"Select a Booking"}),e.jsx("p",{className:"text-gray-500",children:"Click on a booking to view and assign"})]})})]}),A&&e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e.jsxs("div",{className:"bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden",children:[e.jsxs("div",{className:"bg-red-700 text-white p-4 flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold",children:["Select ",{head_waiter:"Head Waiter",service:"Service Staff",extra:"Extra Staff",student:"Students"}[A]||"Staff"]}),e.jsx("button",{onClick:()=>{X(null),ee("")},className:"p-1 hover:bg-red-800 rounded-full",children:e.jsx(Ae,{size:24})})]}),e.jsx("div",{className:"p-3 border-b",children:e.jsxs("div",{className:"relative",children:[e.jsx(De,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",placeholder:"Search staff...",value:Z,onChange:t=>ee(t.target.value),className:"w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"})]})}),e.jsx("div",{className:"overflow-y-auto max-h-[55vh]",children:g.filter(t=>!(A==="head_waiter"&&t.role!=="head_waiter"||A==="service"&&t.role!=="service"&&t.role!=="extra"||A==="extra"&&t.role!=="extra"&&t.role!=="student"||A==="student"&&t.role!=="student"&&t.role!=="extra"||Z&&!t.name.toLowerCase().includes(Z.toLowerCase()))).sort((t,n)=>(t.type||"regular")==="regular"&&(n.type||"regular")!=="regular"?-1:(t.type||"regular")!=="regular"&&(n.type||"regular")==="regular"?1:t.name.localeCompare(n.name)).map(t=>{const n=((a==null?void 0:a.assigned_staff)||[]).some(x=>x.id===t.id),i=Ne(t.id)&&!n,d=(t.type||"regular")==="on_call",u=!t.available||i;return e.jsxs("button",{onClick:()=>Oe(t,A),disabled:u,className:`w-full p-4 flex items-center justify-between border-b border-gray-100 ${u?"opacity-40 cursor-not-allowed":"hover:bg-red-50"} ${n?"bg-red-50":""}`,children:[e.jsxs("div",{className:"text-left min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-medium text-gray-800 truncate",children:t.name}),d&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium",children:"📞 On-Call"}),!d&&e.jsx("span",{className:"px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[10px] font-medium",children:"Regular"})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[t.note&&e.jsx("p",{className:"text-xs text-gray-500",children:t.note}),d&&t.daily_rate>0&&e.jsxs("p",{className:"text-xs text-orange-500",children:["₱",t.daily_rate.toLocaleString(),"/day"]}),d&&t.phone&&e.jsx("p",{className:"text-xs text-gray-400",children:t.phone})]}),i&&e.jsxs("p",{className:"text-xs text-red-500 mt-0.5",children:["📅 Busy on ",a==null?void 0:a.event_date]}),!t.available&&!i&&e.jsx("p",{className:"text-xs text-red-500 mt-0.5",children:"Unavailable"})]}),n&&e.jsx(wt,{size:20,className:"text-red-700"})]},t.id)})}),e.jsx("div",{className:"p-4 border-t",children:e.jsx("button",{onClick:()=>{X(null),ee("")},className:"w-full py-2 bg-red-700 text-white rounded-lg font-medium",children:"Done"})})]})}),Re&&a&&e.jsx($t,{booking:a,onClose:()=>ue(!1),onSave:Ge})]})})}export{ss as default};
