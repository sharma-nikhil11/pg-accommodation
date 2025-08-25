// // components/booking-form.tsx (update the handleSubmit function)
// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     // Get form data
//     const formData = new FormData(e.currentTarget);
//     const formValues: FormData = {
//       name: formData.get("name") as string,
//       phone: formData.get("phone") as string,
//       email: formData.get("email") as string,
//       occupation: formData.get("occupation") as string,
//       roomType: formData.get("room-type") as string,
//       moveInDate: formData.get("move-in-date") as string,
//       referralCode: formData.get("referral") as string || undefined,
//       message: formData.get("message") as string || undefined,
//     };
    
//     // Validate form
//     if (!validateForm(formValues)) {
//       toast.error("Please correct the errors in the form");
//       return;
//     }
    
//     setIsSubmitting(true);
  
//     try {
//       console.log("Submitting form data:", formValues);
      
//       const response = await fetch("/api/submit-form", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formValues),
//       });
  
//       const result = await response.json();
//       console.log("API response:", result);
  
//       if (result.success) {
//         toast.success("Booking Request Submitted", {
//           description: "Your information has been saved. We'll contact you shortly.",
//         });
//         // Reset form
//         formRef.current?.reset();
//         // Clear errors
//         setErrors({});
//       } else {
//         toast.error("Submission Failed", {
//           description: result.message || "Please try again later.",
//         });
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       toast.error("Submission Error", {
//         description: "There was a problem submitting your request. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };