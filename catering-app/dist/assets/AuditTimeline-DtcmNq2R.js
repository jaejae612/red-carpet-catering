import{s as v,u as re,r as p,j as e,X as ne,C as oe,b as le,U as de}from"./index-C4weukHq.js";import{C as Y}from"./credit-card-BG-viwBY.js";import{T as Q}from"./trash-2-B43HpX5l.js";import{A as ie}from"./alert-triangle-CiN5Euck.js";import{P as ce}from"./plus-DTfYNN-A.js";import{C as W}from"./clock-BbLvybSv.js";import{P as me}from"./pen-DPWuNAO8.js";import{P as ue}from"./plus-circle-DG3KgQFv.js";const O=t=>{if(t==null)return"";const n=String(t);return n.includes(",")||n.includes('"')||n.includes(`
`)?`"${n.replace(/"/g,'""')}"`:n},X=(t,n)=>{const r=t.map(O).join(","),o=n.map(d=>d.map(O).join(","));return[r,...o].join(`
`)},K=(t,n,r)=>{const o="\uFEFF",d=new Blob([o+t],{type:`${r};charset=utf-8`}),a=URL.createObjectURL(d),l=document.createElement("a");l.href=a,l.download=n,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(a)},N=t=>t?new Date(t).toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"}):"",A=t=>{if(!t)return"";const[n,r]=t.split(":"),o=parseInt(n);return`${o>12?o-12:o||12}:${r} ${o>=12?"PM":"AM"}`},_=t=>t!=null?`₱${Number(t).toLocaleString()}`:"",k=t=>t?t.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "):"",S=()=>new Date().toISOString().split("T")[0],Pe=(t,n)=>{const r=["Date","Time","Customer","Phone","Email","Venue","Package","Menu Option","Guests","Total (₱)","Paid (₱)","Balance (₱)","Status","Payment","Motif","Special Requests","Created"],o=t.map(a=>[N(a.event_date),A(a.event_time),a.customer_name,a.customer_phone,a.customer_email||"",a.venue,a.menu_package,a.menu_option||"",a.number_of_pax,a.total_amount,a.amount_paid||0,Math.max((a.total_amount||0)-(a.amount_paid||0),0),k(a.status),k(a.payment_status||"unpaid"),a.motif||"",a.special_requests||"",N(a.created_at)]),d=X(r,o);K(d,`bookings-${S()}.csv`,"text/csv")},Se=(t,n)=>{const r=["Date","Time","Customer","Phone","Email","Delivery Address","Items","Total (₱)","Status","Payment","Notes","Created"],o=t.map(a=>[N(a.delivery_date),A(a.delivery_time),a.customer_name,a.customer_phone,a.customer_email||"",a.delivery_address||"",(a.items||[]).map(l=>`${l.name} x${l.quantity}`).join("; "),a.total_amount,k(a.status),k(a.payment_status||"unpaid"),a.notes||"",N(a.created_at)]),d=X(r,o);K(d,`food-orders-${S()}.csv`,"text/csv")},Z=(t,n,r="")=>{const o=window.open("","_blank");if(!o){alert("Please allow popups to export PDF");return}o.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${t}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #b91c1c; }
        .header h1 { color: #b91c1c; font-size: 20px; margin-bottom: 4px; }
        .header p { color: #666; font-size: 12px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
        .summary-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 120px; }
        .summary-card .label { color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .summary-card .value { font-size: 18px; font-weight: bold; color: #111; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #b91c1c; color: white; padding: 8px 6px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
        td { padding: 7px 6px; border-bottom: 1px solid #e5e7eb; font-size: 11px; }
        tr:nth-child(even) { background: #f9fafb; }
        tr:hover { background: #fef2f2; }
        .status { padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-confirmed { background: #d1fae5; color: #065f46; }
        .status-completed { background: #dbeafe; color: #1e40af; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        .status-preparing { background: #e0e7ff; color: #3730a3; }
        .status-ready { background: #d1fae5; color: #065f46; }
        .status-delivered { background: #dbeafe; color: #1e40af; }
        .status-unpaid { background: #fee2e2; color: #991b1b; }
        .status-deposit_paid { background: #fef3c7; color: #92400e; }
        .status-fully_paid { background: #d1fae5; color: #065f46; }
        .status-refund_pending { background: #ffedd5; color: #9a3412; }
        .status-refunded { background: #f3f4f6; color: #4b5563; }
        .status-paid { background: #d1fae5; color: #065f46; }
        .text-right { text-align: right; }
        .footer { margin-top: 20px; text-align: center; color: #999; font-size: 10px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
        @media print { 
          body { padding: 10px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Red Carpet Food and Catering Services</h1>
        <p>${t}</p>
      </div>
      ${r}
      ${n}
      <div class="footer">
        Generated on ${new Date().toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
        • ceburedcarpetcatering.com
      </div>
      <div class="no-print" style="text-align:center;margin-top:20px;">
        <button onclick="window.print()" style="background:#b91c1c;color:white;border:none;padding:10px 30px;border-radius:8px;font-size:14px;cursor:pointer;">
          Print / Save as PDF
        </button>
      </div>
    </body>
    </html>
  `),o.document.close()},E=t=>`<span class="status status-${t||"pending"}">${k(t||"pending")}</span>`,Ce=(t,n)=>{const r=t.reduce((i,x)=>i+(x.total_amount||0),0),o=t.reduce((i,x)=>i+(x.amount_paid||0),0),d=t.reduce((i,x)=>i+(x.number_of_pax||0),0),a=`
    <div class="summary">
      <div class="summary-card"><div class="label">Bookings</div><div class="value">${t.length}</div></div>
      <div class="summary-card"><div class="label">Total Guests</div><div class="value">${d.toLocaleString()}</div></div>
      <div class="summary-card"><div class="label">Total Revenue</div><div class="value">${_(r)}</div></div>
      <div class="summary-card"><div class="label">Amount Paid</div><div class="value">${_(o)}</div></div>
      <div class="summary-card"><div class="label">Balance Due</div><div class="value">${_(r-o)}</div></div>
    </div>
  `,l=`
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Venue</th>
          <th>Package</th>
          <th>Pax</th>
          <th class="text-right">Total</th>
          <th class="text-right">Paid</th>
          <th>Status</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(i=>`
          <tr>
            <td>${N(i.event_date)}</td>
            <td><strong>${i.customer_name}</strong><br/><span style="color:#666;font-size:10px">${i.customer_phone||""}</span></td>
            <td>${i.venue||""}</td>
            <td>${i.menu_package||""}<br/><span style="color:#666;font-size:10px">${i.menu_option||""}</span></td>
            <td>${i.number_of_pax}</td>
            <td class="text-right">${_(i.total_amount)}</td>
            <td class="text-right">${_(i.amount_paid)}</td>
            <td>${E(i.status)}</td>
            <td>${E(i.payment_status||"unpaid")}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;Z(`Bookings Report — ${S()}`,l,a)},Te=(t,n)=>{const r=t.filter(a=>a.status!=="cancelled").reduce((a,l)=>a+(l.total_amount||0),0),o=`
    <div class="summary">
      <div class="summary-card"><div class="label">Orders</div><div class="value">${t.length}</div></div>
      <div class="summary-card"><div class="label">Total Revenue</div><div class="value">${_(r)}</div></div>
    </div>
  `,d=`
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Address</th>
          <th class="text-right">Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(a=>`
          <tr>
            <td>${N(a.delivery_date)}${a.delivery_time?`<br/><span style="color:#666;font-size:10px">${A(a.delivery_time)}</span>`:""}</td>
            <td><strong>${a.customer_name}</strong><br/><span style="color:#666;font-size:10px">${a.customer_phone||""}</span></td>
            <td style="max-width:200px;font-size:10px">${(a.items||[]).map(l=>`${l.name} ×${l.quantity}`).join(", ")}</td>
            <td style="max-width:150px;font-size:10px">${a.delivery_address||""}</td>
            <td class="text-right">${_(a.total_amount)}</td>
            <td>${E(a.status)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;Z(`Food Orders Report — ${S()}`,d,o)};async function L({entityType:t,entityId:n,action:r,adminId:o,adminName:d,changedFields:a=null,description:l=null}){try{await v.from("audit_log").insert([{entity_type:t,entity_id:n,action:r,admin_id:o,admin_name:d||"Unknown",changed_fields:a,description:l||pe(t,r,a)}])}catch(i){console.error("Audit log error:",i)}}function pe(t,n,r){const o={booking:"Booking",food_order:"Food Order",payment:"Payment"}[t]||t;switch(n){case"created":return`${o} created`;case"deleted":return`${o} deleted`;case"status_changed":{const d=r==null?void 0:r.find(l=>l.field==="status");if(d)return`Status changed from "${d.old}" to "${d.new}"`;const a=r==null?void 0:r.find(l=>l.field==="payment_status");return a?`Payment status changed from "${a.old}" to "${a.new}"`:`${o} status changed`}case"payment_recorded":{const d=r==null?void 0:r.find(a=>a.field==="amount");return d?`Payment of ₱${Number(d.new).toLocaleString()} recorded`:"Payment recorded"}case"updated":return!r||r.length===0?`${o} updated`:`Updated: ${r.map(a=>a.field.replace(/_/g," ")).join(", ")}`;default:return`${o} ${n}`}}function ze(t,n,r=null){const o=[],d=r||Object.keys(n);for(const a of d){if(a==="updated_at"||a==="modified_by")continue;const l=(t==null?void 0:t[a])??null,i=(n==null?void 0:n[a])??null,x=JSON.stringify(l),m=JSON.stringify(i);x!==m&&o.push({field:a,old:l,new:i})}return o}async function xe(t,n){const{data:r,error:o}=await v.from("audit_log").select("*").eq("entity_type",t).eq("entity_id",n).order("created_at",{ascending:!1});return o?(console.error("Error fetching audit history:",o),[]):r||[]}const M=[{value:"gcash",label:"GCash",icon:"📱",color:"bg-blue-100 text-blue-700"},{value:"maya",label:"Maya",icon:"📱",color:"bg-green-100 text-green-700"},{value:"bank_transfer",label:"Bank Transfer",icon:"🏦",color:"bg-purple-100 text-purple-700"},{value:"cash",label:"Cash",icon:"💵",color:"bg-emerald-100 text-emerald-700"},{value:"card",label:"Card",icon:"💳",color:"bg-orange-100 text-orange-700"},{value:"check",label:"Check",icon:"🧾",color:"bg-gray-100 text-gray-700"}],F={unpaid:{label:"Unpaid",color:"bg-red-100 text-red-700",dot:"bg-red-500"},deposit_paid:{label:"Deposit Paid",color:"bg-yellow-100 text-yellow-700",dot:"bg-yellow-500"},fully_paid:{label:"Fully Paid",color:"bg-green-100 text-green-700",dot:"bg-green-500"},refund_pending:{label:"Refund Pending",color:"bg-orange-100 text-orange-700",dot:"bg-orange-500"},refunded:{label:"Refunded",color:"bg-gray-100 text-gray-600",dot:"bg-gray-400"}},V=t=>M.find(n=>n.value===t)||M[3],ge=t=>F[t]||F.unpaid,g=t=>`₱${Number(t||0).toLocaleString()}`,fe=t=>t?new Date(t).toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"}):"";function De({bookingId:t,foodOrderId:n,totalAmount:r=0,currentStatus:o,onStatusChange:d}){const{user:a,profile:l}=re(),[i,x]=p.useState([]),[m,w]=p.useState(!0),[C,h]=p.useState(!1),[T,z]=p.useState(null),[B,U]=p.useState(!1),[H,P]=p.useState(""),[c,y]=p.useState({amount:"",method:"gcash",reference_number:"",payment_date:new Date().toISOString().split("T")[0],notes:""});p.useEffect(()=>{D()},[t,n]);const D=async()=>{try{let s=v.from("payments").select("*").order("payment_date",{ascending:!0});t&&(s=s.eq("booking_id",t)),n&&(s=s.eq("food_order_id",n));const{data:u,error:f}=await s;if(f)throw f;x(u||[])}catch(s){console.error("Error fetching payments:",s)}finally{w(!1)}},b=i.reduce((s,u)=>s+Number(u.amount||0),0),j=r-b,R=r>0?Math.min(b/r*100,100):0,I=async()=>{P("");const s=parseFloat(c.amount);if(!s||s<=0){P("Please enter a valid amount");return}U(!0);try{const u={amount:s,method:c.method,reference_number:c.reference_number||null,payment_date:c.payment_date,notes:c.notes||null,recorded_by:(a==null?void 0:a.id)||null};t&&(u.booking_id=t),n&&(u.food_order_id=n);const{error:f}=await v.from("payments").insert([u]);if(f)throw f;L({entityType:t?"booking":"food_order",entityId:t||n,action:"payment_recorded",adminId:a==null?void 0:a.id,adminName:l==null?void 0:l.full_name,changedFields:[{field:"amount",old:null,new:s},{field:"method",old:null,new:c.method}],description:`Payment of ₱${s.toLocaleString()} recorded via ${V(c.method).label}`}),y({amount:"",method:"gcash",reference_number:"",payment_date:new Date().toISOString().split("T")[0],notes:""}),h(!1),await D(),d&&setTimeout(()=>d(),500)}catch(u){P(u.message)}finally{U(!1)}},ee=async s=>{try{const u=i.find(se=>se.id===s),{error:f}=await v.from("payments").delete().eq("id",s);if(f)throw f;z(null),await D(),d&&setTimeout(()=>d(),500),L({entityType:t?"booking":"food_order",entityId:t||n,action:"updated",adminId:a==null?void 0:a.id,adminName:l==null?void 0:l.full_name,description:`Payment of ₱${Number((u==null?void 0:u.amount)||0).toLocaleString()} deleted`})}catch(u){alert("Error deleting payment: "+u.message)}},te=async()=>{try{t&&await v.from("bookings").update({payment_status:"refunded"}).eq("id",t),n&&await v.from("food_orders").update({payment_status:"refunded"}).eq("id",n),d&&d(),L({entityType:t?"booking":"food_order",entityId:t||n,action:"status_changed",adminId:a==null?void 0:a.id,adminName:l==null?void 0:l.full_name,changedFields:[{field:"payment_status",old:"refund_pending",new:"refunded"}]})}catch(s){alert("Error: "+s.message)}},$=Math.round(r*.5),ae=(b===0?[{label:`Full — ${g(r)}`,amount:r},{label:`50% — ${g($)}`,amount:$}]:[{label:`Balance — ${g(j)}`,amount:Math.max(j,0)},...$<j?[{label:`50% — ${g($)}`,amount:$}]:[]]).filter(s=>s.amount>0),q=ge(o);return m?e.jsxs("div",{className:"animate-pulse space-y-3",children:[e.jsx("div",{className:"h-16 bg-gray-100 rounded-xl"}),e.jsx("div",{className:"h-10 bg-gray-100 rounded-xl"})]}):e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Y,{size:16,className:"text-gray-400"}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Payment"}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${q.color}`,children:q.label})]}),e.jsxs("span",{className:"text-sm text-gray-500",children:[g(b)," / ",g(r)]})]}),e.jsx("div",{className:"h-3 bg-gray-200 rounded-full overflow-hidden",children:e.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${R>=100?"bg-green-500":R>0?"bg-yellow-500":"bg-gray-300"}`,style:{width:`${R}%`}})}),e.jsxs("div",{className:"flex justify-between mt-1.5 text-xs text-gray-400",children:[e.jsxs("span",{children:["Paid: ",g(b)]}),j>0&&e.jsxs("span",{children:["Balance: ",g(j)]}),j<=0&&b>0&&e.jsx("span",{className:"text-green-600 font-medium",children:"✓ Fully Paid"})]})]}),i.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs font-medium text-gray-500 uppercase tracking-wide",children:"Payment History"}),i.map(s=>{const u=V(s.method);return e.jsxs("div",{className:"flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2.5 group hover:border-gray-200 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:`w-8 h-8 rounded-full flex items-center justify-center text-sm ${u.color}`,children:u.icon}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold text-gray-800 text-sm",children:g(s.amount)}),e.jsx("span",{className:`px-1.5 py-0.5 rounded text-[10px] font-medium ${u.color}`,children:u.label})]}),e.jsxs("div",{className:"flex items-center gap-2 text-xs text-gray-400",children:[e.jsx("span",{children:fe(s.payment_date)}),s.reference_number&&e.jsxs("span",{children:["• Ref: ",s.reference_number]}),s.notes&&e.jsxs("span",{children:["• ",s.notes]})]})]})]}),T===s.id?e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{onClick:()=>ee(s.id),className:"px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700",children:"Delete"}),e.jsx("button",{onClick:()=>z(null),className:"px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs hover:bg-gray-300",children:"Cancel"})]}):e.jsx("button",{onClick:()=>z(s.id),className:"opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 transition-all",children:e.jsx(Q,{size:14})})]},s.id)})]}),o==="refund_pending"&&e.jsxs("div",{className:"bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ie,{size:16,className:"text-orange-500"}),e.jsxs("span",{className:"text-sm text-orange-700",children:["Refund of ",g(b)," pending"]})]}),e.jsx("button",{onClick:te,className:"px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600",children:"Mark Refunded"})]}),C?e.jsxs("div",{className:"bg-white border border-gray-200 rounded-xl p-4 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"font-medium text-gray-800 text-sm",children:"Record Payment"}),e.jsx("button",{onClick:()=>{h(!1),P("")},className:"text-gray-400 hover:text-gray-600",children:e.jsx(ne,{size:16})})]}),H&&e.jsx("p",{className:"text-red-500 text-xs bg-red-50 rounded-lg p-2",children:H}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Amount (₱)"}),e.jsx("input",{type:"number",value:c.amount,onChange:s=>y({...c,amount:s.target.value}),placeholder:"0",className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"}),e.jsx("div",{className:"flex gap-2 mt-2",children:ae.map(s=>e.jsxs("button",{onClick:()=>y({...c,amount:String(s.amount)}),className:"px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors",children:[s.label," — ₱",s.amount.toLocaleString()]},s.label))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Payment Method"}),e.jsx("div",{className:"grid grid-cols-3 gap-2",children:M.map(s=>e.jsxs("button",{onClick:()=>y({...c,method:s.value}),className:`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-colors ${c.method===s.value?"border-red-500 bg-red-50 text-red-700":"border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"}`,children:[s.icon," ",s.label]},s.value))})]}),["gcash","maya","bank_transfer","card","check"].includes(c.method)&&e.jsxs("div",{children:[e.jsxs("label",{className:"text-xs text-gray-500 mb-1 block",children:["Reference Number ",c.method==="gcash"||c.method==="maya"?"(from receipt)":""]}),e.jsx("input",{type:"text",value:c.reference_number,onChange:s=>y({...c,reference_number:s.target.value}),placeholder:c.method==="bank_transfer"?"Bank transaction #":c.method==="check"?"Check #":"Reference #",className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Payment Date"}),e.jsx("input",{type:"date",value:c.payment_date,onChange:s=>y({...c,payment_date:s.target.value}),className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Notes (optional)"}),e.jsx("input",{type:"text",value:c.notes,onChange:s=>y({...c,notes:s.target.value}),placeholder:"Deposit, Balance, etc.",className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"})]})]}),e.jsx("button",{onClick:I,disabled:B,className:"w-full py-2.5 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 disabled:opacity-50 transition-colors text-sm",children:B?"Saving...":`Record ₱${parseFloat(c.amount||0).toLocaleString()} Payment`})]}):e.jsxs("button",{onClick:()=>h(!0),className:"w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors",children:[e.jsx(ce,{size:16})," Record Payment"]})]})}const G={created:{icon:ue,color:"text-green-600",bg:"bg-green-100",label:"Created"},updated:{icon:me,color:"text-blue-600",bg:"bg-blue-100",label:"Updated"},status_changed:{icon:W,color:"text-amber-600",bg:"bg-amber-100",label:"Status Changed"},deleted:{icon:Q,color:"text-red-600",bg:"bg-red-100",label:"Deleted"},payment_recorded:{icon:Y,color:"text-green-600",bg:"bg-green-100",label:"Payment"}};function he(t){return new Date(t).toLocaleString("en-PH",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0})}function J(t){return t==null?"none":typeof t=="object"?JSON.stringify(t).substring(0,100):String(t)}function Re({entityType:t,entityId:n}){const[r,o]=p.useState([]),[d,a]=p.useState(!1),[l,i]=p.useState(!1);p.useEffect(()=>{l&&r.length===0&&x()},[l,t,n]),p.useEffect(()=>{l?x():o([])},[n]);const x=async()=>{a(!0);const m=await xe(t,n);o(m),a(!1)};return e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4 mt-4",children:[e.jsxs("button",{onClick:()=>i(!l),className:"w-full flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold text-gray-700 flex items-center gap-2",children:[e.jsx(W,{size:18})," Activity Log",r.length>0&&e.jsx("span",{className:"text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full",children:r.length})]}),l?e.jsx(oe,{size:18,className:"text-gray-400"}):e.jsx(le,{size:18,className:"text-gray-400"})]}),l&&e.jsx("div",{className:"mt-3",children:d?e.jsx("div",{className:"animate-pulse space-y-2",children:[1,2,3].map(m=>e.jsx("div",{className:"h-12 bg-gray-200 rounded-lg"},m))}):r.length===0?e.jsx("p",{className:"text-sm text-gray-400 text-center py-4",children:"No activity recorded"}):e.jsxs("div",{className:"space-y-0 relative",children:[e.jsx("div",{className:"absolute left-4 top-3 bottom-3 w-0.5 bg-gray-200"}),r.map(m=>{const w=G[m.action]||G.updated,C=w.icon;return e.jsxs("div",{className:"relative flex gap-3 py-2",children:[e.jsx("div",{className:`w-8 h-8 rounded-full ${w.bg} flex items-center justify-center z-10 shrink-0`,children:e.jsx(C,{size:14,className:w.color})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm text-gray-800",children:m.description}),e.jsxs("div",{className:"flex items-center gap-2 text-xs text-gray-400 mt-0.5",children:[e.jsx("span",{children:he(m.created_at)}),m.admin_name&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"•"}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(de,{size:10})," ",m.admin_name]})]})]}),m.changed_fields&&m.changed_fields.length>0&&m.action==="updated"&&e.jsxs("div",{className:"mt-1 text-xs text-gray-500 bg-white rounded p-2 space-y-0.5",children:[m.changed_fields.slice(0,5).map((h,T)=>e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:h.field.replace(/_/g," ")}),":"," ",e.jsx("span",{className:"text-red-500 line-through",children:J(h.old)})," → ",e.jsx("span",{className:"text-green-600",children:J(h.new)})]},T)),m.changed_fields.length>5&&e.jsxs("p",{className:"text-gray-400",children:["+",m.changed_fields.length-5," more fields"]})]})]})]},m.id)})]})})]})}export{Re as A,De as P,Ce as a,Se as b,ze as c,Te as d,Pe as e,L as l};
