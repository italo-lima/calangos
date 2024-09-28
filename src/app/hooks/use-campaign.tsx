'use client';
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from 'react';

import { CurrentCampaign } from '../interfaces';
import { getCurrentCampaign } from '../_actions/get-current-campaign';
import { isAfter, isBefore } from 'date-fns';

type CampaignContextType = {
  campaign: CurrentCampaign | null;
  getCampaign: () => {};
  isValidCampaign: boolean;
};

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignContext = createContext({} as CampaignContextType);

export const CampaignProvider = ({ children }: CampaignProviderProps) => {
  const [campaign, setCampaign] = useState<CurrentCampaign | null>(null);
  const [isValidCampaign, setIsValidCampaign] = useState(false);

  const getCampaign = useCallback(async () => {
    if (campaign) return;

    const currentCampaign = await getCurrentCampaign();
    if (currentCampaign) setCampaign(currentCampaign);
  }, [campaign]);

  useEffect(() => {
    const fetch = async () => {
      await getCampaign();
    };

    fetch();
  }, [getCampaign]);

  useEffect(() => {
    if (campaign && campaign.active) {
      const now = new Date();
      const isWithinRange =
        isAfter(now, campaign.startDate) && isBefore(now, campaign.endDate);
      setIsValidCampaign(isWithinRange);
    }
  }, [campaign]);

  return (
    <CampaignContext.Provider
      value={{ campaign, getCampaign, isValidCampaign }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  return useContext(CampaignContext);
};
