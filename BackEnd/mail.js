const nodemailer = require('nodemailer');
const mjml2html  = require('mjml');
require('dotenv').config({ path: '.env' });


function mail(x,y){
  let title,content,link,img
  let header=`<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="'Barlow', 'Helvetica', 'Arial', sans-serif"></mj-all>
      <mj-button background-color="#3700E3"></mj-button>
    </mj-attributes>
    <mj-font href="https://fonts.googleapis.com/css?family=Barlow:normal,italic,bold&display=swap" name="Barlow"></mj-font>
  </mj-head>
  <mj-body background-color="#F6F6F6">
    <mj-section padding="0px">
      <mj-column padding="0">
        <mj-spacer height="32px"></mj-spacer>
      </mj-column>
    </mj-section>
    <mj-section background-color="#3700E3" padding="48px">
      <mj-column padding="0">
        <mj-image align="left" padding="0px" src="http://test-deployment2.s3-website.ap-south-1.amazonaws.com/assets/Logo%20with%20fullname-32b55e42.png" width="160px"></mj-image>
        <mj-spacer height="12px"></mj-spacer>
        <mj-text color="#fff" font-size="48px" padding="10px">
          <strong>News and updates</strong>
        </mj-text>
      </mj-column>
    </mj-section>`
  const fotter=`   <mj-section background-color="#071226" padding="40px">
  <mj-column padding="0">

    <mj-spacer height="30px"></mj-spacer>
    <mj-text align="center" color="#fff" font-size="18px" line-height="1.5" padding-bottom="0px" padding-left="10px" padding-right="10px" padding-top="10px" padding="10px">
      <strong>Find us on</strong>
    </mj-text>
    <mj-social font-size="15px" icon-padding="5px" icon-size="30px" mode="horizontal" padding-bottom="0px" padding-left="25px" padding-right="25px" padding-top="10px" padding="10px 25px">
      <mj-social-element src="https://cdn.getvero.com/dd-editor/ui-assets/icons/social/facebook.png" alt="https://www.facebook.com/" href="https://www.facebook.com/" name="facebook-noshare" title="https://www.facebook.com/"></mj-social-element>
      <mj-social-element src="https://cdn.getvero.com/dd-editor/ui-assets/icons/social/google-plus.png" alt="https://www.google.com/" href="https://www.google.com/" name="google-noshare" title="https://www.google.com/"></mj-social-element>
      <mj-social-element src="https://cdn.getvero.com/dd-editor/ui-assets/icons/social/twitter.png" alt="https://www.twitter.com/" href="https://www.twitter.com/" name="twitter-noshare" title="https://www.twitter.com/"></mj-social-element>
    </mj-social>
  </mj-column>
</mj-section>
</mj-body>
</mjml>`


for (var i of y){
  title=i.title
  content=i.content
  link=i.link
  img=i.img
  header +=`  <mj-section background-color="#fff" padding-bottom="56px" padding-left="48px" padding-right="48px" padding-top="23px" padding="48px">
  <mj-column padding="0">
    <mj-text font-size="30px" line-height="1.5" padding="0px">
      <strong>${title}</strong><br /><strong></strong>
    </mj-text>
    <mj-spacer height="8px"></mj-spacer>
    <mj-text font-size="20px" line-height="1.5" padding="0px">
      ${content}
    </mj-text>
    <mj-spacer height="40px"></mj-spacer>
    <mj-button href=${link} align="left" border-radius="0px" font-size="20px" line-height="1.5" padding="0px">
      <strong>Read more</strong>
    </mj-button>
    <mj-spacer height="40px"></mj-spacer>
    <mj-image fluid-on-mobile="true" padding="0px" src=${img}></mj-image>
    <mj-spacer height="46px"></mj-spacer>
    <mj-divider border-color="#3700E3" border-style="solid" border-width="2px" padding-bottom="10px" padding-left="0" padding-right="0" padding-top="10px" padding="10px 0"></mj-divider>
  </mj-column>
  </mj-section>`

}
header +=fotter

const { html } = mjml2html (header);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raviteja8332023214@gmail.com',
    pass: process.env.mail_pass
  }
});

// Create an email message
for (var i of x){
  const mailOptions = {
    from: 'abrahamlinken@gmail.com',
    to: i,
    subject: 'Daily Dose of Business News: Propel Your Growth with 100x',
    html: html
  };


  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })

}


}




module.exports = mail;