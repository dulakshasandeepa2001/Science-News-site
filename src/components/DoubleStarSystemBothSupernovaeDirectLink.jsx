import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const DoubleStarSystemBothSupernovaeDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/double-star-system-both-supernovae')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Double Star System Where Both Stars Exploded as Supernovae
    </Button>
  );
};

export default DoubleStarSystemBothSupernovaeDirectLink;
