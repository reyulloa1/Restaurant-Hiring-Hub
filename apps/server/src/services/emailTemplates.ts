export function applicantConfirmationTemplate(firstName: string, roleTitle: string) {
  return {
    subject: `Application received: ${roleTitle}`,
    html: `<p>Hi ${firstName},</p><p>Thanks for applying to the ${roleTitle} role. Our team will review your submission shortly.</p>`,
  };
}

export function internalNotificationTemplate(candidateName: string, roleTitle: string, score: number) {
  return {
    subject: `New candidate: ${candidateName} for ${roleTitle}`,
    html: `<p>${candidateName} applied for ${roleTitle} and received an initial score of <strong>${score}</strong>.</p>`,
  };
}
