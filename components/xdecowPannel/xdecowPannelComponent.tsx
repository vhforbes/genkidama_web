import React, { useEffect } from 'react';
import { useXdecow } from '../../hooks/xdecowPannel';

const XdecowPannelComponent = () => {
  const { getData, xdecowData } = useXdecow();

  useEffect(() => {
    getData();
  }, []);

  if (!xdecowData) return null;

  return (
    <div className="card bg-primary flex h-56 border-2 border-lightTeal border-opacity-40">
      <div className="card-body p-0">
        <div className="flex justify-center bg-secondary borrder-2 border-b-slate900 py-2">
          <a
            href="https://xdecow.com/referral/GENKIDAMA"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-28" src="/xdecow_logo.png" alt="" />
          </a>
        </div>

        <div className="h-">
          <p className="text-center mt-2 text-xl font-bold">BTCUSDT</p>
          <p className="text-center mt-2">
            MV Δ x Mean:{' '}
            <span
              className={`font-bold ${
                xdecowData.mv_15_xmean > 0 ? 'text-green' : 'text-red'
              }`}
            >
              {xdecowData.mv_15_xmean}x
            </span>
          </p>
          <p className="text-center mt-2">
            OI 60m Δ%:{' '}
            <span
              className={`font-bold ${
                xdecowData.oi_60_delta > 0 ? 'text-green' : 'text-red'
              }`}
            >
              {xdecowData.oi_60_delta}%
            </span>
          </p>
          <p className="text-center mt-2">
            Funding Rate:{' '}
            <span
              className={`font-bold ${
                xdecowData.funding_rate > 0 ? 'text-green' : 'text-red'
              }`}
            >
              {xdecowData?.funding_rate.toFixed(4)}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default XdecowPannelComponent;
