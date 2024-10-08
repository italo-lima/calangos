import { useCampaign } from '@/app/hooks/use-campaign';
import { Button } from '../ui/button';
import Link from 'next/link';

export const Campaign = () => {
  const { campaign } = useCampaign();

  return (
    <div className="bg-primary px-4 py-10 text-gray-50 text-center">
      <h1 className="text-3xl font-semibold pb-4">{campaign?.name}</h1>
      <p>{campaign?.description}</p>
      <Button
        className="bg-primary text-gray-50 border-gray-50 border rounded-full mt-4"
        asChild
      >
        <Link href="/campaign">Participar agora</Link>
      </Button>
    </div>
  );
};
