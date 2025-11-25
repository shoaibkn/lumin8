"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitCallRequest(data: {
  phoneNumber: string;
  name: string;
}) {
  try {
    //@ts-expect-error error
    const submission = await prisma.callRequest.create({
      data: {
        phoneNumber: data.phoneNumber,
        name: data.name,
      },
    });
    // Send email to admin
    await resend.emails.send({
      from: "Lumin8 <onboarding@lumin8.in>",
      to: "hello@lumin8.in",
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phoneNumber}</p>
      `,
    });
    return {
      success: true,
      message: "We will get back to you soon!",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    // Send email to admin
    await resend.emails.send({
      from: "Lumin8 <onboarding@lumin8.in>",
      to: "hello@lumin8.in",
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "Lumin8 <onboarding@lumin8.in>",
      to: data.email,
      subject: "Thank you for contacting Lumin8",
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <!--[if !mso]><!-- -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
          <meta name="x-apple-disable-message-reformatting" />
          <link href="https://fonts.googleapis.com/css?family=AR+One+Sans:ital,wght@0,400;0,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Manrope:ital,wght@0,400" rel="stylesheet" />
          <title>Flowly</title>
          <!-- Made with Postcards Email Builder by Designmodo -->
          <style>
              html,body{margin:0 !important;padding:0 !important;min-height:100% !important;width:100% !important;-webkit-font-smoothing:antialiased;}*{-ms-text-size-adjust:100%;}#outlook a{padding:0;}.ReadMsgBody,.ExternalClass{width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{line-height:100%;}table,td,th{mso-table-lspace:0 !important;mso-table-rspace:0 !important;border-collapse:collapse;}u + .body table,u + .body td,u + .body th{will-change:transform;}body,td,th,p,div,li,a,span{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;mso-line-height-rule:exactly;}img{border:0;outline:0;line-height:100%;text-decoration:none;-ms-interpolation-mode:bicubic;}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;}.body .pc-project-body{background-color:transparent !important;}@media (min-width:621px){.pc-lg-hide{display:none;}.pc-lg-bg-img-hide{background-image:none !important;}}
          </style>
          <style>
              @media (max-width:620px){.pc-project-body{min-width:0 !important;}.pc-project-container,.pc-component{width:100% !important;}.pc-sm-hide{display:none !important;}.pc-sm-bg-img-hide{background-image:none !important;}.pc-w620-padding-0-0-0-0{padding:0 !important;}.pc-w620-itemsVSpacings-20{padding-top:10px !important;padding-bottom:10px !important;}.pc-w620-itemsHSpacings-0{padding-left:0 !important;padding-right:0 !important;}table.pc-w620-spacing-0-20-40-20{margin:0 20px 40px !important;}td.pc-w620-spacing-0-20-40-20,th.pc-w620-spacing-0-20-40-20{margin:0 !important;padding:0 20px 40px !important;}.pc-w620-itemsVSpacings-0{padding-top:0 !important;padding-bottom:0 !important;}.pc-w620-itemsHSpacings-10{padding-left:5px !important;padding-right:5px !important;}.pc-w620-font-size-14px{font-size:14px !important;}table.pc-w620-spacing-0-0-40-0{margin:0 0 40px !important;}td.pc-w620-spacing-0-0-40-0,th.pc-w620-spacing-0-0-40-0{margin:0 !important;padding:0 0 40px !important;}.pc-w620-font-size-40px{font-size:40px !important;}.pc-w620-line-height-42px{line-height:42px !important;}.pc-w620-padding-20-0-0-0{padding:20px 0 0 !important;}table.pc-w620-spacing-0-0-0-0{margin:0 !important;}td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin:0 !important;padding:0 !important;}.pc-w620-font-size-28px{font-size:28px !important;}.pc-w620-line-height-36px{line-height:36px !important;}table.pc-w620-spacing-0-20-20-20{margin:0 20px 20px !important;}td.pc-w620-spacing-0-20-20-20,th.pc-w620-spacing-0-20-20-20{margin:0 !important;padding:0 20px 20px !important;}.pc-w620-letter-spacing-0px{letter-spacing:0 !important;}.pc-w620-font-size-16px{font-size:16px !important;}.pc-w620-line-height-20px{line-height:20px !important;}.pc-w620-padding-12-24-12-24{padding:12px 24px !important;}.pc-w620-padding-20-0-20-0{padding:20px 0 !important;}.pc-w620-line-height-24px{line-height:24px !important;}.pc-w620-padding-0-0-20-0{padding:0 0 20px !important;}.pc-w620-padding-20-20-20-20{padding:20px !important;}.pc-w620-color-ffffff{color:#fff !important;}table.pc-w620-spacing-0-50-30-50{margin:0 50px 30px !important;}td.pc-w620-spacing-0-50-30-50,th.pc-w620-spacing-0-50-30-50{margin:0 !important;padding:0 50px 30px !important;}.pc-w620-padding-40-20-30-20{padding:40px 20px 30px !important;}.pc-w620-itemsVSpacings-30{padding-top:15px !important;padding-bottom:15px !important;}table.pc-w620-spacing-0-0-20-0{margin:0 0 20px !important;}td.pc-w620-spacing-0-0-20-0,th.pc-w620-spacing-0-0-20-0{margin:0 !important;padding:0 0 20px !important;}.pc-w620-itemsHSpacings-20{padding-left:10px !important;padding-right:10px !important;}.pc-w620-padding-12-12-12-12{padding:12px !important;}.pc-w620-width-20{width:20px !important;}.pc-w620-height-auto{height:auto !important;}table.pc-w620-spacing-0-32-0-32{margin:0 32px !important;}td.pc-w620-spacing-0-32-0-32,th.pc-w620-spacing-0-32-0-32{margin:0 !important;padding:0 32px !important;}.pc-g-ib{display:inline-block !important;}.pc-g-b{display:block !important;}.pc-g-rb{display:block !important;width:auto !important;}.pc-g-wf{width:100% !important;}.pc-g-rpt{padding-top:0 !important;}.pc-g-rpr{padding-right:0 !important;}.pc-g-rpb{padding-bottom:0 !important;}.pc-g-rpl{padding-left:0 !important;}}
          </style>
          <!--[if !mso]><!-- -->
          <style>
              @font-face{font-family:'AR One Sans';font-style:normal;font-weight:400;src:url('https://fonts.gstatic.com/s/aronesans/v4/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWn_9PWQ9mQ.woff') format('woff'),url('https://fonts.gstatic.com/s/aronesans/v4/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWn_9PWQ9nw.woff2') format('woff2');}@font-face{font-family:'AR One Sans';font-style:normal;font-weight:700;src:url('https://fonts.gstatic.com/s/aronesans/v4/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWpj6PWQ9mQ.woff') format('woff'),url('https://fonts.gstatic.com/s/aronesans/v4/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWpj6PWQ9nw.woff2') format('woff2');}@font-face{font-family:'Manrope';font-style:normal;font-weight:400;src:url('https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FN_M-b8.woff') format('woff'),url('https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FN_M-bk.woff2') format('woff2');}
          </style>
          <!--<![endif]-->
          <!--[if mso]><style type="text/css">.pc-font-alt{font-family:Arial,Helvetica,sans-serif !important;}</style><![endif]-->
          <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      </head>

      <body class="body pc-font-alt" style="width:100% !important;min-height:100% !important;margin:0 !important;padding:0 !important;mso-line-height-rule:exactly;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-variant-ligatures:normal;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;background-color:#d275fc2e"
      bgcolor="#d275fc">
          <table class="pc-project-body" style="table-layout:fixed;width:100%;min-width:600px;background-color:#d275fc2e" bgcolor="#d275fc" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
                  <td align="center" valign="top" style="width:auto">
                      <table class="pc-project-container" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                              <td class="pc-w620-padding-0-0-0-0" style="padding:20px 0" align="left" valign="top">
                                  <table class="pc-component" style="width:600px;max-width:600px" width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <td valign="top" class="pc-w620-padding-20-0-0-0" style="padding:24px 0 0;height:unset;background-color:#030208" bgcolor="#030208">
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pc-w620-spacing-0-20-40-20" style="padding:0 24px 70px">
                                                                      <table class="pc-width-fill" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td class="pc-g-rpt pc-g-rpb pc-w620-itemsVSpacings-20" align="left" valign="middle" style="padding-top:0;padding-bottom:0">
                                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td align="left" valign="middle">
                                                                                                  <a class="pc-font-alt" href="https://postcards.email/" target="_blank" style="text-decoration:none;display:inline-block;vertical-align:top"><img src="https://cloudfilesdm.com/postcards/0d63d6d7380a34298aadbfbbe61c6646.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;object-fit:contain;width:143px;height:auto;max-width:100%;border:0"
                                                                                                      width="143" height="26" alt="" /></a>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                                  <td class="pc-w620-itemsHSpacings-0" valign="middle" style="padding-right:10px;padding-left:10px"></td>
                                                                                  <td class="pc-g-rpt pc-g-rpb pc-w620-itemsVSpacings-20" align="left" valign="middle" style="padding-top:0;padding-bottom:0">
                                                                                      <table style="width:100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td align="right" valign="middle">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td align="right" valign="top"></td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pc-w620-spacing-0-0-40-0" align="center" valign="top" style="padding:0 60px 40px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-40px pc-w620-line-height-42px" style="font-size:64px;line-height:70px;text-align:center;text-align-last:center;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;letter-spacing:0;font-style:normal">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:64px;line-height:70px;font-weight:400" class="pc-w620-font-size-40px pc-w620-line-height-42px">We're excited to have you!</span></div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td valign="top"><img src="https://cloudfilesdm.com/postcards/image-17410039761941-5cd84ab4.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border:0"
                                                                      width="600" height="auto" alt="" /></td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="pc-component" style="width:600px;max-width:600px" width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <td valign="top" class="pc-w620-padding-20-0-20-0" style="padding:20px 0 24px;height:unset;background-color:#FFF" bgcolor="#FFFFFF">
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td align="center" valign="top" style="padding:0 0 8px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-28px pc-w620-line-height-36px" style="font-size:40px;line-height:50px;text-align:center;text-align-last:center;color:#030208;font-family:'Manrope',Arial,Helvetica,sans-serif;letter-spacing:0;font-style:normal">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:40px;line-height:50px;font-weight:400" class="pc-w620-font-size-28px pc-w620-line-height-36px">Getting Started</span></div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pc-w620-spacing-0-20-20-20" align="center" valign="top" style="padding:0 40px 28px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-16px pc-w620-line-height-20px" style="font-size:24px;line-height:30px;text-align:center;text-align-last:center;color:#757479;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:-0.2px">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:24px;line-height:30px" class="pc-w620-letter-spacing-0px pc-w620-font-size-16px pc-w620-line-height-20px">You're now part of something great. Let's help you get the most out of your experience.</span></div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td valign="top"><img src="https://cloudfilesdm.com/postcards/image-17410039766822-02343ed0.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border:0"
                                                                      width="600" height="auto" alt="" /></td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="pc-component" style="width:600px;max-width:600px" width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <td valign="top" class="pc-w620-padding-0-0-0-0" style="height:unset;background-color:#ff0808" bgcolor="#ff0808">
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td valign="top"><img src="https://cloudfilesdm.com/postcards/image-17410039771563-b22a1d26.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border:0"
                                                                      width="259" height="auto" alt="" /></td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="pc-component" style="width:600px;max-width:600px" width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <td valign="top" class="pc-w620-padding-20-20-20-20" style="padding:20px 32px 64px;height:unset;background-color:#030208" bgcolor="#030208">
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td align="center" valign="top" style="padding:0 0 8px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-28px pc-w620-line-height-36px" style="font-size:40px;line-height:50px;text-align:center;text-align-last:center;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:40px;line-height:50px" class="pc-w620-font-size-28px pc-w620-line-height-36px">What's n</span>
                                                                                              <span
                                                                                              style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:40px" class="pc-w620-font-size-28px pc-w620-line-height-36px">ext</span>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td align="center" valign="top" style="padding:0 0 32px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-16px pc-w620-line-height-24px" style="font-size:24px;line-height:30px;text-align:center;text-align-last:center;color:#b7b6bb;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:-0px">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:24px;line-height:30px" class="pc-w620-font-size-16px pc-w620-line-height-24px">We will connect with you at the earliest to help you with your concerns</span></div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td style="padding:0 0 32px">
                                                                      <table class="pc-width-fill pc-g-b" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                          <tbody class="pc-g-b">
                                                                              <tr class="pc-g-ib pc-g-wf">
                                                                                  <td class="pc-g-rb pc-g-rpt pc-g-wf pc-w620-itemsVSpacings-20" align="left" valign="top" style="width:50%;padding-top:0;padding-bottom:4px">
                                                                                      <table style="border-collapse:separate;border-spacing:0;width:100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td class="pc-w620-padding-0-0-20-0" align="left" valign="middle" style="padding:0 0 20px;height:auto;background-color:#26252b;border-radius:16px 16px 16px 16px;border-top:1px solid #3e3d41;border-right:1px solid #3e3d41;border-bottom:1px solid #3e3d41;border-left:1px solid #3e3d41">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top" style="line-height:1px;font-size:1px"><img src="https://cloudfilesdm.com/postcards/image-17410039776644-2f3efbb8.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border-radius:16px 16px 0 0;border:0"
                                                                                                              width="278" height="auto" alt="" /></td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:10px 20px 8px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:20px;line-height:30px;text-align:left;text-align-last:left;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:20px;line-height:30px">Seemless Integration</span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:0 20px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:15px;line-height:22px;text-align:left;text-align-last:left;color:#b7b6bb;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:15px;line-height:22px">Custom integration</span></div>
                                                                                                                                              <div
                                                                                                                                              style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:15px;line-height:22px">for all your entrprise needs</span></div>
                                                                                                                                          <div
                                                                                                                                          style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:15px;line-height:22px">seemlessly.</span></div>
                                                                                                                                      </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                                  <td class="pc-w620-itemsHSpacings-0" valign="top" style="padding-right:4px;padding-left:4px"></td>
                                                                                  <td class="pc-g-rb pc-g-wf pc-w620-itemsVSpacings-20" align="left" valign="top" style="width:50%;padding-top:0;padding-bottom:4px">
                                                                                      <table style="border-collapse:separate;border-spacing:0;width:100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td class="pc-w620-padding-0-0-0-0" align="left" valign="middle" style="background-color:#26252b;border-radius:16px 16px 16px 16px;border-top:1px solid #3e3d41;border-right:1px solid #3e3d41;border-bottom:1px solid #3e3d41;border-left:1px solid #3e3d41">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:20px 20px 8px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:20px;line-height:30px;text-align:left;text-align-last:left;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:20px;line-height:30px">Custom Solutions</span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:0 20px 10px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:15px;line-height:22px;text-align:left;text-align-last:left;color:#b7b6bb;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:15px;line-height:22px">Whether its a infrastructure, secuity or ecommerce, we cater to all your needs. </span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top" style="line-height:1px;font-size:1px"><img src="https://cloudfilesdm.com/postcards/image-17410039780895-44f2f0a9.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border-radius:0 0 16px 16px;border:0"
                                                                                                              width="262" height="auto" alt="" /></td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr class="pc-g-ib pc-g-wf">
                                                                                  <td class="pc-g-rb pc-g-wf pc-w620-itemsVSpacings-20" align="left" valign="top" style="width:50%;padding-top:4px;padding-bottom:0">
                                                                                      <table style="border-collapse:separate;border-spacing:0;width:100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td class="pc-w620-padding-0-0-0-0" align="left" valign="middle" style="background-color:#26252b;border-radius:16px 16px 16px 16px;border-top:1px solid #3e3d41;border-right:1px solid #3e3d41;border-bottom:1px solid #3e3d41;border-left:1px solid #3e3d41">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top" style="line-height:1px;font-size:1px"><img src="https://cloudfilesdm.com/postcards/image-17410039785776-9ea8d082.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border-radius:16px 16px 0 0;border:0"
                                                                                                              width="262" height="auto" alt="" /></td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:32px 20px 8px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:20px;line-height:30px;text-align:left;text-align-last:left;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:20px;line-height:30px">ERP Architects</span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:0 20px 20px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:15px;line-height:22px;text-align:left;text-align-last:left;color:#b7b6bb;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:15px;line-height:22px">Sophisticated yet easy-to-work with modern erp solutions for SMEs.</span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                                  <td class="pc-w620-itemsHSpacings-0" valign="top" style="padding-right:4px;padding-left:4px"></td>
                                                                                  <td class="pc-g-rb pc-g-rpb pc-g-wf pc-w620-itemsVSpacings-20" align="left" valign="top" style="width:50%;padding-top:4px;padding-bottom:0">
                                                                                      <table style="border-collapse:separate;border-spacing:0;width:100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td class="pc-w620-padding-0-0-0-0" align="left" valign="middle" style="background-color:#26252b;border-radius:16px 16px 16px 16px;border-top:1px solid #3e3d41;border-right:1px solid #3e3d41;border-bottom:1px solid #3e3d41;border-left:1px solid #3e3d41">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:10px 20px 8px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:20px;line-height:30px;text-align:left;text-align-last:left;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:20px;line-height:30px">Offline support</span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top">
                                                                                                              <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" style="padding:0 20px 42px;height:auto">
                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left">
                                                                                                                              <tr>
                                                                                                                                  <td valign="top" align="left">
                                                                                                                                      <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                                          <div style="font-size:15px;line-height:22px;text-align:left;text-align-last:left;color:#b7b6bb;font-family:'AR One Sans',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                              <div style="font-family:'AR One Sans',Arial,Helvetica,sans-serif"><span style="font-family:'AR One Sans',Arial,Helvetica,sans-serif;font-weight:400;font-size:15px;line-height:22px">On call offline support for selected regions including Agra.</span></div>
                                                                                                                                          </div>
                                                                                                                                      </div>
                                                                                                                                  </td>
                                                                                                                              </tr>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                          <td align="left" valign="top" style="line-height:1px;font-size:1px"><img src="https://cloudfilesdm.com/postcards/image-17410039789827-86e27d49.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border-radius:0 0 16px 16px;border:0"
                                                                                                              width="262" height="auto" alt="" /></td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                          </tbody>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="pc-component" style="width:600px;max-width:600px" width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <!--[if !gte mso 9]><!-- -->
                                                      <td valign="top" class="pc-w620-padding-40-20-30-20" style="background-image:url('https://cloudfilesdm.com/postcards/image-17410039793738-850b1bae.png');background-size:cover;background-position:center;background-repeat:no-repeat;padding:78px 0 86px;height:unset;background-color:#030208"
                                                      bgcolor="#030208" background="https://cloudfilesdm.com/postcards/image-17410039793738-850b1bae.png">
                                                          <!--<![endif]-->
                                                          <!--[if gte mso 9]><td valign="top" align="center" style="background-image:url('https://cloudfilesdm.com/postcards/image-17410039793738-850b1bae.png');background-size:cover;background-position:center;background-repeat:no-repeat;background-color:#030208;border-radius:0" bgcolor="#030208" background="https://cloudfilesdm.com/postcards/image-17410039793738-850b1bae.png"><![endif]-->
                                                          <!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px"><v:fill src="https://cloudfilesdm.com/postcards/image-17410039793738-850b1bae.png" color="#030208" type="frame" size="1,1" aspect="atleast" origin="0,0" position="0,0"/><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0"><div style="font-size:0;line-height:0"><table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="font-size:14px;line-height:1.5" valign="top"><p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td colspan="3" height="78" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td width="0" valign="top" style="line-height:1px;font-size:1px">&nbsp;</td><td valign="top" align="left"><![endif]-->
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td align="center" valign="top" style="padding:0 0 12px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-28px pc-w620-line-height-36px" style="font-size:30px;line-height:40px;text-align:center;text-align-last:center;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:30px;line-height:40px" class="pc-w620-color-ffffff pc-w620-font-size-28px pc-w620-line-height-36px">Connect with us</span></div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tr>
                                                                  <td class="pc-w620-spacing-0-50-30-50" align="center" valign="top" style="padding:0 140px 32px;mso-padding-left-alt:0;margin-left:140px;height:auto">
                                                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="margin-right:auto;margin-left:auto">
                                                                          <tr>
                                                                              <td valign="top" align="center">
                                                                                  <div class="pc-font-alt" style="text-decoration:none">
                                                                                      <div class="pc-w620-font-size-16px pc-w620-line-height-24px" style="font-size:18px;line-height:26px;text-align:center;text-align-last:center;color:#b7b6bb;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                          <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px" class="pc-w620-font-size-16px pc-w620-line-height-24px">If you need anything, our team is here to </span>
                                                                                              <a
                                                                                              href="mailto:hello@lumin8.in?subject=Enquiry" target="_blank" rel="noreferrer" style="text-decoration:none;color:inherit;color:rgb(183,182,187);font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px;text-decoration:underline" class="pc-w620-font-size-16px pc-w620-line-height-24px">help</span></a>
                                                                                                  <span
                                                                                                  style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px" class="pc-w620-font-size-16px pc-w620-line-height-24px">
                                                                                                  every step of the way.</span>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </td>
                                                                          </tr>
                                                                      </table>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <!--[if gte mso 9]></td><td width="0" style="line-height:1px;font-size:1px" valign="top">&nbsp;</td></tr><tr><td colspan="3" height="86" style="line-height:1px;font-size:1px">&nbsp;</td></tr></table></td></tr></table></div><p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p></v:textbox></v:rect><![endif]--></td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  <table class="pc-component" style="width:600px;max-width:600px" width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                          <td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <!--[if !gte mso 9]><!-- -->
                                                      <td valign="top" class="pc-w620-padding-20-20-20-20" style="background-image:url('https://cloudfilesdm.com/postcards/image-174100398048011-56660d9e.png');background-size:cover;background-position:center;background-repeat:no-repeat;padding:9px 32px 32px;height:unset;background-color:#FFF"
                                                      bgcolor="#FFFFFF" background="https://cloudfilesdm.com/postcards/image-174100398048011-56660d9e.png">
                                                          <!--<![endif]-->
                                                          <!--[if gte mso 9]><td valign="top" align="center" style="background-image:url('https://cloudfilesdm.com/postcards/image-174100398048011-56660d9e.png');background-size:cover;background-position:center;background-repeat:no-repeat;background-color:#FFF;border-radius:0" bgcolor="#FFFFFF" background="https://cloudfilesdm.com/postcards/image-174100398048011-56660d9e.png"><![endif]-->
                                                          <!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px"><v:fill src="https://cloudfilesdm.com/postcards/image-174100398048011-56660d9e.png" color="#FFFFFF" type="frame" size="1,1" aspect="atleast" origin="0,0" position="0,0"/><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0"><div style="font-size:0;line-height:0"><table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="font-size:14px;line-height:1.5" valign="top"><p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td colspan="3" height="9" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td width="32" valign="top" style="line-height:1px;font-size:1px">&nbsp;</td><td valign="top" align="left"><![endif]-->
                                                          <table class="pc-width-fill pc-g-b" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                              <tbody class="pc-g-b">
                                                                  <tr class="pc-g-ib pc-g-wf">
                                                                      <td class="pc-g-rb pc-g-rpt pc-g-rpb pc-g-wf pc-w620-itemsVSpacings-30" align="left" valign="top" style="width:100%;padding-top:0;padding-bottom:0">
                                                                          <table style="border-collapse:separate;border-spacing:0;width:100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                              <tr>
                                                                                  <td class="pc-w620-padding-20-0-20-0" align="center" valign="middle" style="padding:32px 0;height:auto;background-color:#26252b;border-radius:16px 16px 16px 16px;border-top:1px solid #3e3d41;border-right:1px solid #3e3d41;border-bottom:1px solid #3e3d41;border-left:1px solid #3e3d41">
                                                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                          <tr>
                                                                                              <td align="center" valign="top" style="line-height:1px;font-size:1px">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td align="center" valign="top" style="padding:0 0 40px;height:auto"><img src="https://cloudfilesdm.com/postcards/0d63d6d7380a34298aadbfbbe61c6646.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;object-fit:contain;width:172px;height:auto;max-width:100%;border:0"
                                                                                                              width="172" height="31" alt="" /></td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                          <tr>
                                                                                              <td align="center" valign="top" style="line-height:1px;font-size:1px">
                                                                                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td class="pc-w620-spacing-0-0-20-0" align="center" valign="top" style="padding:0 0 50px;height:auto"><img src="https://cloudfilesdm.com/postcards/image-174100398006710-6801a923.png" style="display:block;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:100%;height:auto;border:0"
                                                                                                              width="534" height="auto" alt="" /></td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                          <tr>
                                                                                              <td align="center" valign="top">
                                                                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td class="pc-w620-spacing-0-0-20-0" align="center" style="padding:0 0 24px">
                                                                                                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                  <tr>
                                                                                                                      <td style="width:unset" valign="top">
                                                                                                                          <table class="pc-width-hug" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                              <tbody>
                                                                                                                                  <tr>
                                                                                                                                      <td class="pc-g-rpt pc-g-rpb pc-w620-itemsVSpacings-0" valign="middle" style="padding-top:0;padding-bottom:0">
                                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                                              <tr>
                                                                                                                                                  <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding:14px;mso-padding-left-alt:0;margin-left:14px;height:auto;background-color:#030208;border-radius:100px 100px 100px 100px">
                                                                                                                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                                                          <tr>
                                                                                                                                                              <td align="center" valign="top" style="line-height:1px;font-size:1px">
                                                                                                                                                                  <a class="pc-font-alt" href="http://m.me/869669736230700?text=Hi" target="_blank" style="text-decoration:none;display:inline-block;vertical-align:top"><img src="https://cloudfilesdm.com/postcards/49d3df40d21a60424c3bf0f27d4ce8f9.png" class="pc-w620-width-20 pc-w620-height-auto"
                                                                                                                                                                      style="display:block;border:0;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:24px;height:24px"
                                                                                                                                                                      width="24" height="24" alt="" /></a>
                                                                                                                                                              </td>
                                                                                                                                                          </tr>
                                                                                                                                                      </table>
                                                                                                                                                  </td>
                                                                                                                                              </tr>
                                                                                                                                          </table>
                                                                                                                                      </td>
                                                                                                                                      <td class="pc-w620-itemsHSpacings-20" valign="middle" style="padding-right:4px;padding-left:4px;mso-padding-left-alt:0;margin-left:4px"></td>
                                                                                                                                      <td class="pc-g-rpt pc-g-rpb pc-w620-itemsVSpacings-0" valign="middle" style="padding-top:0;padding-bottom:0">
                                                                                                                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                                              <tr>
                                                                                                                                                  <td class="pc-w620-padding-12-12-12-12" align="center" valign="middle" style="padding:14px;mso-padding-left-alt:0;margin-left:14px;height:auto;background-color:#030208;border-radius:100px 100px 100px 100px">
                                                                                                                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                                                                          <tr>
                                                                                                                                                              <td align="center" valign="top" style="line-height:1px;font-size:1px">
                                                                                                                                                                  <a class="pc-font-alt" href="https://instagram.com/lumin8in" target="_blank" style="text-decoration:none;display:inline-block;vertical-align:top"><img src="https://cloudfilesdm.com/postcards/c9c8570037a4b4e6df17c131ae0823f9.png" class="pc-w620-width-20 pc-w620-height-auto"
                                                                                                                                                                      style="display:block;border:0;outline:0;line-height:100%;-ms-interpolation-mode:bicubic;width:24px;height:24px"
                                                                                                                                                                      width="24" height="24" alt="" /></a>
                                                                                                                                                              </td>
                                                                                                                                                          </tr>
                                                                                                                                                      </table>
                                                                                                                                                  </td>
                                                                                                                                              </tr>
                                                                                                                                          </table>
                                                                                                                                      </td>
                                                                                                                                  </tr>
                                                                                                                              </tbody>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                          <tr>
                                                                                              <td align="center" valign="top">
                                                                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                                                                      <tr>
                                                                                                          <td class="pc-w620-spacing-0-32-0-32" valign="top" style="padding:0 70px;mso-padding-left-alt:0;margin-left:70px;height:auto">
                                                                                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                                                                  <tr>
                                                                                                                      <td valign="top" align="center">
                                                                                                                          <div class="pc-font-alt" style="text-decoration:none">
                                                                                                                              <div class="pc-w620-font-size-16px" style="font-size:18px;line-height:26px;text-align:center;text-align-last:center;color:#fff;font-family:'Manrope',Arial,Helvetica,sans-serif;font-style:normal;letter-spacing:0">
                                                                                                                                  <div style="font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px" class="pc-w620-font-size-16px">Tailor your experience, </span>
                                                                                                                                      <a
                                                                                                                                      href="https://postcards.email/" target="_blank" rel="noreferrer" style="text-decoration:none;color:inherit;color:rgb(195,86,242);font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px;text-decoration:underline"
                                                                                                                                          class="pc-w620-font-size-16px">unsubscribe</span></a><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px"
                                                                                                                                          class="pc-w620-font-size-16px"> anytime, and explore our </span>
                                                                                                                                          <a href="https://postcards.email/" target="_blank" rel="noreferrer"
                                                                                                                                          style="text-decoration:none;color:inherit;color:rgb(195,86,242);font-family:'Manrope',Arial,Helvetica,sans-serif"><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px;text-decoration:underline"
                                                                                                                                              class="pc-w620-font-size-16px">privacy policy</span></a><span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-weight:400;font-size:18px;line-height:26px"
                                                                                                                                          class="pc-w620-font-size-16px">.</span></div>
                                                                                                                              </div>
                                                                                                                          </div>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </table>
                                                                                                          </td>
                                                                                                      </tr>
                                                                                                  </table>
                                                                                              </td>
                                                                                          </tr>
                                                                                      </table>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <!--[if gte mso 9]></td><td width="32" style="line-height:1px;font-size:1px" valign="top">&nbsp;</td></tr><tr><td colspan="3" height="32" style="line-height:1px;font-size:1px">&nbsp;</td></tr></table></td></tr></table></div><p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p></v:textbox></v:rect><![endif]--></td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>

      </html>`,
    });

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
