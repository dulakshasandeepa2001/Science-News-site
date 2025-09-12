import { spacecraftArticle } from './articles/Spacecraft_Black_Hole.js';
import { einsteinRingArticle } from './articles/Einstein_Ring_Black_Hole.js';
import { ancientForestArticle } from './articles/Ancient_Forest_Discovered_Under_Melting_Arctic_Ice.js';
import floridaPantherArticle from './articles/FloridaPantherArticlePage.js';
import zombieVirusArticle from './articles/Zombie_Virus_Rabbits.js';
import { Sony_Humanoid_Robots_Weaknesses } from './articles/Sony_Humanoid_Robots_Weaknesses.js';
import { Orange_Shark_Discovery } from './articles/Orange_Shark_Discovery.js';
import { Uranus_New_Moon_Discovery } from "./articles/Uranus_New_Moon_Discovery";
import { Aspirin_Replacement_Clopidogrel } from './articles/Aspirin_Replacement_Clopidogrel.js';
import { Atlas_Comet_Confirmation } from './articles/Atlas_Comet_Confirmation.js';
import { Changan_Nevo_A06 } from './articles/Changan_Nevo_A06.js';
import { Russia_Enteromix_Vaccine } from './articles/Russia_Enteromix_Vaccine.js';
import { Cyanobacteria_Mars_Oxygen } from './articles/Cyanobacteria_Mars_Oxygen.js';
import { Mars_Life_Discovery } from './articles/Mars_Life_Discovery.js';

import { Space_Plane_Mission } from './articles/Space_Plane_Mission.js';
import { Black_Death_Shadow } from './articles/Black_Death_Shadow.js';
import { China_AR_Helmet } from './articles/China_AR_Helmet.js';

// Import other individual articles
import labImage from '../assets/lab.jpg';
import dnaImage from '../assets/dna.jpg';
import jwstImage from '../assets/jwst.jpg';

// Articles that haven't been moved to individual files yet
const brainWeightLossArticle = {
  id: 3,
  title: "Scientists Uncover Hidden Brain Shortcut to Weight Loss",
  summary: "Scientists have uncovered a way to promote weight loss and improve blood sugar control without the unpleasant side effects of current GLP-1 drugs.",
  image: labImage,
  category: "Health & Medicine",
  date: "August 10, 2025",
  author: "Medical Research Institute",
  readTime: "6 min read",
  content: {
    sections: [
      {
        title: "The Breakthrough",
        content: "Scientists have uncovered a way to promote weight loss and improve blood sugar control without the unpleasant side effects of current GLP-1 drugs. By shifting focus from neurons to brain support cells that produce appetite-suppressing molecules, researchers have found a new pathway to combat obesity."
      },
      {
        title: "Current Drug Limitations",
        content: "Current weight loss medications like GLP-1 agonists, while effective, often come with significant side effects including nausea, vomiting, and gastrointestinal distress that can limit their use and patient compliance."
      },
      {
        title: "The New Approach",
        content: "Instead of targeting neurons directly, this new approach focuses on glial cells - the brain's support cells - which play a crucial role in regulating appetite and metabolism without causing the adverse effects associated with current treatments."
      },
      {
        title: "Mechanism of Action",
        content: "The research reveals how these brain support cells produce specific molecules that naturally suppress appetite and regulate blood sugar levels, offering a more targeted and potentially safer approach to weight management."
      },
      {
        title: "Clinical Implications",
        content: "This discovery could lead to the development of new weight loss treatments that are more tolerable for patients while maintaining or even improving efficacy compared to current options."
      },
      {
        title: "Research Methodology",
        content: "The study employed advanced neuroimaging techniques and molecular biology methods to identify and characterize the specific cellular pathways involved in this newly discovered mechanism."
      },
      {
        title: "Future Directions",
        content: "Researchers are now working to develop targeted therapies based on these findings, with clinical trials expected to begin within the next few years."
      }
    ]
  }
};

const dnaBreakthroughArticle = {
  id: 4,
  title: "DNA Breakthrough: New Gene Editing Technique Discovered",
  summary: "Researchers have developed a revolutionary gene editing technique that could transform how we treat genetic diseases.",
  image: dnaImage,
  category: "Health & Medicine",
  date: "August 9, 2025",
  author: "Genetic Research Lab",
  readTime: "7 min read",
  content: {
    sections: [
      {
        title: "Revolutionary Discovery",
        content: "Researchers have developed a revolutionary gene editing technique that surpasses CRISPR in precision and safety. This breakthrough could transform how we treat genetic diseases and opens new possibilities for therapeutic interventions."
      },
      {
        title: "Beyond CRISPR",
        content: "While CRISPR has been groundbreaking, this new technique offers improved accuracy with significantly reduced off-target effects, making it safer for clinical applications."
      },
      {
        title: "Technical Innovation",
        content: "The new method uses a novel protein complex that can make precise edits to DNA without creating double-strand breaks, reducing the risk of unintended mutations."
      },
      {
        title: "Clinical Applications",
        content: "This technique shows particular promise for treating inherited genetic disorders, certain cancers, and other conditions caused by specific genetic mutations."
      },
      {
        title: "Safety Profile",
        content: "Extensive testing has shown that this new approach has a much lower risk of off-target effects compared to existing gene editing technologies."
      },
      {
        title: "Regulatory Pathway",
        content: "The research team is working with regulatory agencies to establish safety protocols and guidelines for clinical trials of this new gene editing approach."
      },
      {
        title: "Global Impact",
        content: "This breakthrough could make gene therapy more accessible worldwide, particularly for rare genetic diseases that currently have limited treatment options."
      }
    ]
  }
};

const aiSystemArticle = {
  id: 5,
  title: "AI System Detects Diseases Before Symptoms Appear",
  summary: "Researchers develop AI system that can predict diseases years before symptoms appear, potentially revolutionizing preventive healthcare.",
  image: labImage,
  category: "Technology",
  date: "August 8, 2025",
  author: "Tech Health Institute",
  readTime: "5 min read",
  content: {
    sections: [
      {
        title: "Predictive Power",
        content: "A groundbreaking AI system has demonstrated the ability to detect disease biomarkers years before symptoms manifest, potentially transforming how we approach preventive healthcare."
      },
      {
        title: "Data Integration",
        content: "The system analyzes a combination of genomic data, blood biomarkers, and health history to create personalized risk profiles and early detection mechanisms for various diseases."
      },
      {
        title: "Clinical Validation",
        content: "In a five-year study involving over 10,000 participants, the AI successfully predicted the onset of several chronic conditions with accuracy rates exceeding 90%."
      },
      {
        title: "Privacy Concerns",
        content: "Researchers have implemented advanced encryption and anonymization techniques to address the significant privacy concerns associated with such predictive health technologies."
      },
      {
        title: "Healthcare Integration",
        content: "Medical institutions are beginning to integrate this technology into regular check-ups, potentially creating a new standard for preventive care."
      },
      {
        title: "Cost Implications",
        content: "Early economic analyses suggest that widespread adoption could significantly reduce healthcare costs by shifting resources from treatment to prevention."
      },
      {
        title: "Ethical Considerations",
        content: "The technology raises important questions about how to handle predictive information, particularly for conditions without current treatment options."
      }
    ]
  }
};

const quantumInternetArticle = {
  id: 6,
  title: "Quantum Internet Breakthrough: Secure Communication Achieved Over 100km",
  summary: "Scientists demonstrate quantum entanglement-based communication over unprecedented distances, bringing quantum internet closer to reality.",
  image: jwstImage,
  category: "Technology",
  date: "August 7, 2025",
  author: "Quantum Research Center",
  readTime: "6 min read",
  content: {
    sections: [
      {
        title: "Distance Record",
        content: "Researchers have successfully demonstrated quantum entanglement-based secure communication over a record distance of 100 kilometers, a major milestone toward developing a practical quantum internet."
      },
      {
        title: "Entanglement Explained",
        content: "Quantum entanglement allows particles to remain connected so that actions performed on one affect the other, regardless of distance. This property enables theoretically unhackable communication channels."
      },
      {
        title: "Technical Challenge",
        content: "The team overcame the challenge of quantum decoherence—the loss of quantum information due to interaction with the environment—using a novel system of quantum repeaters."
      },
      {
        title: "Practical Applications",
        content: "This breakthrough could enable ultra-secure communications for financial institutions, government agencies, and critical infrastructure, providing protection against even quantum computer-based attacks."
      },
      {
        title: "Global Network",
        content: "Scientists envision a global quantum internet that would connect quantum computers and sensors, enabling new types of scientific experiments and computational capabilities."
      },
      {
        title: "Implementation Timeline",
        content: "Experts suggest that limited quantum networks could be operational within five years, with more comprehensive networks following in the subsequent decade."
      },
      {
        title: "International Efforts",
        content: "Research teams across Europe, North America, and Asia are collaborating to establish common protocols and infrastructure for the emerging quantum internet."
      }
    ]
  }
};

const carbonCaptureArticle = {
  id: 7,
  title: "New Carbon Capture Technology Removes CO2 at Record Efficiency",
  summary: "Revolutionary carbon capture system removes atmospheric CO2 at 300% higher efficiency than current methods, with significantly lower energy costs.",
  image: labImage,
  category: "Environment",
  date: "August 6, 2025",
  author: "Climate Solutions Institute",
  readTime: "5 min read",
  content: {
    sections: [
      {
        title: "Efficiency Breakthrough",
        content: "Scientists have developed a revolutionary carbon capture system that removes atmospheric CO2 with 300% greater efficiency than current methods, while consuming significantly less energy."
      },
      {
        title: "Novel Materials",
        content: "The system utilizes advanced metal-organic frameworks (MOFs) with unprecedented surface area and CO2 binding affinity, enabling more effective carbon capture at ambient conditions."
      },
      {
        title: "Energy Requirements",
        content: "Unlike conventional systems that require substantial energy input, this technology operates with minimal energy consumption, making large-scale deployment more economically viable."
      },
      {
        title: "Scalability",
        content: "Initial tests demonstrate that the technology can be scaled from industrial installations to smaller, distributed units that could be deployed in urban environments."
      },
      {
        title: "Carbon Utilization",
        content: "The captured carbon can be converted into useful products such as construction materials or synthetic fuels, creating economic incentives for carbon capture."
      },
      {
        title: "Climate Impact",
        content: "Climate models suggest that widespread deployment of this technology could significantly contribute to meeting global carbon reduction targets by removing historical emissions."
      },
      {
        title: "Implementation Strategy",
        content: "Researchers are collaborating with industry partners to begin pilot installations at power plants and industrial facilities within the next 18 months."
      }
    ]
  }
};

const quantumComputingArticle = {
  id: 9,
  title: "Breakthrough in Quantum Computing Achieves Error Correction Milestone",
  summary: "Scientists have successfully implemented a practical quantum error correction system that makes quantum computers significantly more reliable for real-world applications.",
  image: labImage,
  category: "Technology",
  date: "August 14, 2025",
  author: "Quantum Research Foundation",
  readTime: "6 min read",
  content: {
    sections: [
      {
        title: "Major Breakthrough",
        content: "In what experts are calling a 'watershed moment' for quantum computing, researchers have demonstrated a practical quantum error correction system that dramatically increases the reliability of quantum calculations. This achievement addresses one of the most significant obstacles to making quantum computers useful for real-world applications."
      },
      {
        title: "The Error Problem",
        content: "Quantum computers are extremely susceptible to errors caused by environmental noise, which has limited their practical use. Even minor disturbances can cause qubits—the fundamental units of quantum information—to lose their quantum state, a phenomenon known as decoherence."
      },
      {
        title: "Technical Solution",
        content: "The new system uses a network of physical qubits working together to create more stable 'logical qubits.' By distributing quantum information across multiple physical qubits in a carefully designed pattern, errors can be detected and corrected without disturbing the quantum calculation itself."
      },
      {
        title: "Performance Improvements",
        content: "Tests show that the error-corrected quantum system maintained coherence approximately 50 times longer than previous systems. More importantly, it remained stable enough to complete complex calculations that would have failed on earlier quantum computers."
      },
      {
        title: "Implications for Industry",
        content: "This breakthrough could accelerate the timeline for quantum advantage in fields like drug discovery, materials science, and cryptography. Companies in the pharmaceutical and financial sectors have already expressed interest in applying the technology to their most challenging computational problems."
      },
      {
        title: "Next Steps",
        content: "The research team is now working to scale the system to handle more qubits while maintaining error correction capabilities. They're also developing standardized interfaces that will make the technology more accessible to researchers without expertise in quantum mechanics."
      },
      {
        title: "Timeline to Commercialization",
        content: "While still in the research phase, the team estimates that commercial quantum computing systems incorporating these error correction techniques could be available within 3-5 years, much sooner than previously expected."
      }
    ]
  }
};

// Combine all articles into a single array
export const articles = [
  Mars_Life_Discovery, // Newest article first (current date)
  Cyanobacteria_Mars_Oxygen,
  Russia_Enteromix_Vaccine, 
  Changan_Nevo_A06,
  Atlas_Comet_Confirmation,
  Aspirin_Replacement_Clopidogrel,
  China_AR_Helmet,
  Black_Death_Shadow,
  Space_Plane_Mission,
  Uranus_New_Moon_Discovery, 
  spacecraftArticle,
  einsteinRingArticle,
  brainWeightLossArticle,
  dnaBreakthroughArticle,
  aiSystemArticle,
  quantumInternetArticle,
  carbonCaptureArticle,
  ancientForestArticle,
  quantumComputingArticle,
  floridaPantherArticle,
  zombieVirusArticle,
  Sony_Humanoid_Robots_Weaknesses,
  Orange_Shark_Discovery
];
