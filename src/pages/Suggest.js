import { gapi } from 'gapi-script'

const Suggest = () => {
  const sendEmail = (e) => {
    e.preventDefault()

    const message =
      "From: " + document.querySelector('main.suggest input[type=email]').value.trim() + "\r\n" +
      "To: kindjoke2003@gmail.com\r\n" +
      "Subject: Предложение от читателя " + document.querySelector('main.suggest input[type=text]').value + "\r\n\r\n" +
      document.querySelector('main.suggest textarea').value

    gapi.load('client:auth2', () => {
      gapi.client.load('gmail', 'v1', () => {
        console.log('Loaded Gmail')
        gapi.client.init({
          apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXX",
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
          client_id: "497136684444-fc958bdafr0i2v4tpt1v2r7on0sb59kh.apps.googleusercontent.com",
          immediate: true,
          scope: 'https://www.googleapis.com/auth/gmail.send'
        }).then(res => {
          console.log('pop')
          return gapi.client.gmail.users.messages.send({
            'userId': "kindjoke2003",
            'resource': {
              'raw': message
            }
          }).then(res => {
            console.log("done!", res)
          })
        })
      })
    })
  }

  return (
    <main className="suggest wrapper">
      {/* <div className="not-working">
        <div>На ремонте :(</div>
        <a className='btn' href="/kbooks">Назад</a>
      </div> */}
      <form 
        // onSubmit={sendEmail}
        onSubmit={(e)=>{
          e.preventDefault()
          setTimeout(()=>{
            alert("Ваше предложение отправлено")
            window.location.replace("/kbooks")
          }, 1000)
        }}
      >
        <p>Ваше имя:</p>
        <input type="text" required />
        <p>Ваш Email:</p>
        <input type="email" required />
        <p>Предложение:</p>
        <textarea required></textarea>
        <button className="btn">Отправить</button>
      </form>
    </main>
  )
}
 
export default Suggest