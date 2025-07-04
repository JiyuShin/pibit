import ConversationView from '../components/conversation/ConversationView';
import { useRouter } from 'next/router';

export default function WiggleConversationPage() {
  const router = useRouter();
  const { name } = router.query;
  
  return <ConversationView moduleType="wiggle" nickname={name} />;
} 