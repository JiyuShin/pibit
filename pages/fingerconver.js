import ConversationView from '../components/conversation/ConversationView';
import { useRouter } from 'next/router';

export default function FingerConversationPage() {
  const router = useRouter();
  const { name } = router.query;
  
  return <ConversationView moduleType="finger" nickname={name} />;
} 