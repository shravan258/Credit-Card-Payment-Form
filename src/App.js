import { useState, useEffect } from 'react';
import './app.css';
import visa from './visa.png';
import mastercard from './mastercard.png';
import discover from './discover.png';
import unionpay from './unionpay.png';
import ReactCardFlip from 'react-card-flip';
import chip from './chip.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const CARDS = {
    visa: '^4',
    mastercard: '^5[1-5]',
    discover: '^6011',
    unionpay: '^62',
  };
  const LOGO = {
    visa,
    mastercard,
    discover,
    unionpay,
  };
  const [cardNo, setcardNo] = useState('');
  const [pic, setpic] = useState(visa);
  const [isFlipped, setisFlipped] = useState(false);
  const [cvv, setcvv] = useState('');
  const [name, setname] = useState('');
  const [month, setmonth] = useState('MM');
  const [year, setyear] = useState('YY');

  useEffect(() => {
    brandChange();
  }, [cardNo]);

  const handleFlip = () => setisFlipped(!isFlipped);
  const handleUnflip = () => setisFlipped(false);

  const handleNumChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\s+/g, '');
    const credNum = value.match(/.{1,4}/g)?.join(' ') ?? value;
    setcardNo(credNum);
  };
  const cardType = (cardNumber) => {
    const number = cardNumber;
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return 'visa';
  };
  const brandChange = () => {
    setpic(LOGO[cardType(cardNo)]);
  };

  const handleNameChange = (event) => {
    setname(event.target.value.toUpperCase());
  };

  return (
    <div className='form'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
        <div className='card-front'>
          <div className='logo'>
            <img src={chip} alt='' height={52} className='chip' />
            <img src={pic} alt='' className='brandlogo' />
          </div>

          <div className='inpBox'>
            <input
              type='text'
              className='cardnum'
              placeholder='####  ####  ####  ####'
              value={cardNo}
            />
          </div>
          <div className='card-bt'>
            <div className='holder'>
              <p className='holder-text'>Card holder</p>
              <input
                type='text'
                className='bt-text1'
                placeholder='FULL NAME'
                value={name}
              />
            </div>
            <div className='expires'>
              <p className='expire-text'>expires</p>
              <input
                type='text'
                name=''
                id=''
                className='bt-text'
                placeholder='MM/YY'
                value={`${month}/${year}`}
              />
            </div>
          </div>
        </div>

        <div className='card-back'>
          <div className='black-strip'>
            <p>s</p>
          </div>
          <p className='cvvlabel'>cvv</p>
          <div>
            <input
              type='password'
              className='etx'
              dir='rtl'
              value={cvv}
              required
            />
          </div>
          <img src={pic} alt='' srcset='' className='backlogo' />
        </div>
      </ReactCardFlip>

      <div className='form-container'>
        <form className='form-subcontainer'>
          <div class='form-group namearea'>
            <label for='formGroupExampleInput'>Card Number</label>
            <input
              type='text'
              required
              className='form-control area2'
              value={cardNo}
              onChange={handleNumChange}
              onFocus={handleUnflip}
              maxLength='19'
            />
          </div>
          <div class='form-group namearea'>
            <label for='formGroupExampleInput2'>Card Holder</label>
            <input
              type='text'
              required
              className='form-control area2'
              value={name}
              onChange={handleNameChange}
              onFocus={handleUnflip}
              maxLength='19'
            />
          </div>
          <div className='date-sec'>
            <div className='monthyear'>
              <select
                name='Month'
                required
                value={month}
                onChange={(event) => setmonth(event.target.value)}
                className='selectopt'
              >
                <option value='month'>Month</option>
                <option value='01'>01</option>
                <option value='02'>02</option>
                <option value='03'>03</option>
                <option value='04'>04</option>
                <option value='05'>05</option>
                <option value='06'>06</option>
                <option value='07'>07</option>
                <option value='08'>08</option>
                <option value='09'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select>
            </div>
            <div className='monthyear'>
              <select
                name='Year'
                required
                value={year}
                onChange={(event) => setyear(event.target.value)}
                className='selectopt'
              >
                <option value='2019'>2019</option>
                <option value='2020'>2020</option>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2025'>2025</option>
                <option value='2026'>2026</option>
                <option value='2027'>2027</option>
              </select>
            </div>
            <div>
              <div class='form-group'>
                <label for='formGroupExampleInput'>CVV</label>
                <input
                  type='text'
                  required
                  class='form-control area2'
                  id='formGroupExampleInput'
                  value={cvv}
                  maxLength='3'
                  onChange={(event) => setcvv(event.target.value)}
                  onFocus={handleFlip}
                />
              </div>
            </div>
          </div>
          <button
            type='button'
            className='btn btn-primary btn-lg btn-block submit'
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
