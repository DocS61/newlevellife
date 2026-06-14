export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 })
    }

    const subjectLabels: Record<string, string> = {
      feedback: 'Feedback zur Website',
      frage: 'Frage zu einer Analyse',
      vorschlag: 'Feature-Vorschlag',
      fehler: 'Fehler melden',
      sonstiges: 'Sonstiges',
    }

    const subjectLabel = subjectLabels[subject] || subject

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, hsl(340,75%,55%), hsl(262,60%,55%)); padding: 24px 30px; border-radius: 12px 12px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Neue Kontaktanfrage</h2>
          <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">über namensreue.de</p>
        </div>
        <div style="padding: 24px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 100px; vertical-align: top;">Name:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">E-Mail:</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: hsl(262,60%,55%);">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Betreff:</td>
              <td style="padding: 10px 0; font-size: 14px;">${subjectLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 4px solid hsl(340,75%,55%);">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Nachricht</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Gesendet am: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
          </p>
        </div>
      </div>
    `

    const appUrl = process.env.NEXTAUTH_URL || ''

    try {
      const response = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_KONTAKTFORMULAR,
          subject: `Kontaktanfrage: ${subjectLabel} – von ${name}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'hello@new-level-life.de',
          reply_to: email,
          sender_email: appUrl ? `noreply@${new URL(appUrl).hostname}` : undefined,
          sender_alias: 'Namensreue',
        }),
      })

      const result = await response.json()
      if (!result.success && !result.notification_disabled) {
        console.error('[Kontakt] E-Mail-Versand fehlgeschlagen:', result)
      }
    } catch (emailError) {
      console.error('[Kontakt] E-Mail-Versand Fehler:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Kontakt] Fehler:', error)
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 })
  }
}
