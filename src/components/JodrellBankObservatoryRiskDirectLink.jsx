import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const JodrellBankObservatoryRiskDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/jodrell-bank-observatory-risk')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about The Future of Jodrell Bank Observatory at Risk
    </Button>
  );
};

export default JodrellBankObservatoryRiskDirectLink;
