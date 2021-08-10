import classNames from 'components/member-card/card.module.scss';
import { CURRENCIES, walletURL } from 'helper-functions/urls';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Coins = (props) => {
  const { coin, balance } = props;
  return (
    <div className={classNames.walletContainer}>
      <div className={classNames.coinData}>
        <p>{coin}</p>
        <p>{balance}</p>
      </div>
      <div
        className={
          coin === CURRENCIES.NEELAM ? classNames.coinNeelam : classNames.coinDinero
        }></div>
    </div>
  );
};

const ShowWallet = ({ show }) => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const coins = [];
  useEffect(() => {
    const fetchData = async () => {
      await fetch(walletURL, { credentials: 'include' })
        .then((res) => {
          if (res.status >= 400 && res.status < 600) {
            throw new Error('Bad response from server');
          }
          return res.json();
        })
        .then((resJson) => {
          const currencyBalance = resJson.wallet.currencies;
          for (const name in currencyBalance) {
            coins.push({
              name,
              balance: currencyBalance[name]
            });
          }
          setCurrencies(coins);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        });
    };

    fetchData();
  }, []);

  return (
    <div className={show ? classNames.showMemberSkills : classNames.showSkills}>
      {!isError && isLoading ? (
        <p>Loading...</p>
      ) : (
        currencies.map((coin) => <Coins coin={coin.name} balance={coin.balance} key={coin.name} />)
      )}
    </div>
  );
};

ShowWallet.propTypes = {
  show: PropTypes.bool.isRequired
};

Coins.propTypes = {
  coin: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
};

export default ShowWallet;
