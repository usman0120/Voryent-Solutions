"use client";
import { handleContactSubmission } from "@/app/actions/form-actions";

export default function TestPage() {
  const trigger = async () => {
    const formData = new FormData();
    formData.append("name", "Test User");
    formData.append("email", "test@test.com");
    formData.append("message", "This is a test message to trigger the 500 error.");
    formData.append("security_token", "1l_fakehash"); // invalid but shouldn't 500
    try {
      const result = await handleContactSubmission(formData);
      console.log("Result:", result);
    } catch (e) {
      console.error("Caught error in client:", e);
    }
  };

  return <button onClick={trigger}>Trigger</button>;
}
