import nodemailer from 'nodemailer'

export default {
  // async..await is not allowed in global scope, must use a wrapper
async  SendEmail(email:string,IdHashed:number) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:"******.com",
            pass:"*****"
        }
    })
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Instruções para Redifinição da Senha</b> <a href=http://localhost:3000/resetPassword/${IdHashed}> Acesse a Página</a>`,
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
}