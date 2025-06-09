import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getCurrentUser } from "./session";

export async function getUserClinicId() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const clinicId = (await cookies()).get("clinic_id")?.value;

  if (!clinicId) {
    redirect("/clinics/select");
  }

  return clinicId;
}
