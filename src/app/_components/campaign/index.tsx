import { useCampaign } from '@/app/_hooks/useCampaign';
import { Button } from '../ui/button';

export const Campaign = () => {
  const { campaign } = useCampaign();

  return (
    <div className="bg-primary px-4 py-10 text-gray-50 text-center">
      <h1 className="text-3xl font-semibold pb-4">{campaign?.name}</h1>
      <p>{campaign?.description}</p>
      <Button className="bg-primary text-gray-50 border-gray-50 border rounded-full mt-4">
        Participar agora
      </Button>
    </div>
  );
};
