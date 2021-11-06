/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from '@components/member-card/card.module.scss';
import { CURRENCIES } from '@helper-functions/urls';
import { walletDetails } from './mock-data/wallet';

const Currency = ({ coin, balance }) => (
  <div className={classNames.walletContainer}>
    <div className={classNames.coinData}>
      <p className={classNames.coinType}>{coin}</p>
      <p className={classNames.balance}>{balance}</p>
    </div>
    <div
      className={classNames.coin}
      style={{ backgroundColor: coin === CURRENCIES.NEELAM ? 'blue' : 'green' }}
    />
  </div>
);

const ShowWallet = ({ show }) => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const coins = [];
    const fetchData = () => {
      try {
        const walletObj = walletDetails;
        const currencyBalance = walletObj.wallet.currencies;
        Object.keys(currencyBalance).forEach((name) => {
          coins.push({
            name,
            balance: currencyBalance[name],
          });
        });
        setCurrencies(coins);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={show ? classNames.showMemberSkills : classNames.showSkills}>
      {!isError && isLoading ? (
        <p>Loading...</p>
      ) : currencies && !isError ? (
        currencies.map((coin) => (
          <Currency coin={coin.name} balance={coin.balance} key={coin.name} />
        ))
      ) : (
        <p>Error Loading Wallet...</p>
      )}
    </div>
  );
};

ShowWallet.propTypes = {
  show: PropTypes.bool.isRequired,
};

Currency.propTypes = {
  coin: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default ShowWallet;
