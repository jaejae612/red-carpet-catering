# Integration Guide: Terms and Conditions in BookingPage

## File: src/components/TermsAndConditions.jsx
Copy the TermsAndConditions.jsx file to this location.

---

## Changes to BookingPage.jsx

### 1. Add Import (at top of file, around line 15)

```jsx
import TermsAndConditions from '../components/TermsAndConditions'
```

### 2. Add State Variable (around line 46, with other useState)

```jsx
const [termsAccepted, setTermsAccepted] = useState(false)
```

### 3. Add Terms Component in renderStep6 (around line 1751, before the error message)

Find this section:
```jsx
        <div className="bg-red-700 text-white rounded-xl p-5">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">₱{total.toLocaleString()}</span>
          </div>
          <p className="text-red-200 text-sm mt-1">Deposit: ₱5,000</p>
        </div>
        
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
```

Replace with:
```jsx
        <div className="bg-red-700 text-white rounded-xl p-5">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">₱{total.toLocaleString()}</span>
          </div>
          <p className="text-red-200 text-sm mt-1">50% Deposit required: ₱{Math.round(total * 0.5).toLocaleString()}</p>
        </div>

        {/* Terms and Conditions */}
        <TermsAndConditions 
          compact={true}
          accepted={termsAccepted}
          onAccept={setTermsAccepted}
        />
        
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
```

### 4. Update Submit Button (around line 1809)

Find:
```jsx
<button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2">
```

Replace with:
```jsx
<button onClick={handleSubmit} disabled={loading || !termsAccepted} className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2">
```

---

## Same changes needed for CocktailBookingPage.jsx

Apply similar changes:
1. Import TermsAndConditions
2. Add termsAccepted state
3. Add <TermsAndConditions compact /> before submit button
4. Disable submit if !termsAccepted

---

## Bank Account Info (for reference)

- **BDO Account:** 2450090408
- **BPI Account:** 9263031927
- **Account Name:** Cebu Red Carpet Catering Services, Inc.
