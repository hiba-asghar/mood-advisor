interface Response {
  emoji: string;
  advice: string;
}

export const mockAgent = {
  invoke: async (method: string, params: { text: string }): Promise<Response> => {
    const moodText = params.text.toLowerCase();

    // Get random response from array
    const getRandomResponse = (responses: Response[]): Response => {
      return responses[Math.floor(Math.random() * responses.length)];
    };

    // Response arrays for different moods
    const happyResponses: Response[] = [
      {
        emoji: '😊',
        advice: 'Keep spreading that happiness! Remember to share your joy with others.'
      },
      {
        emoji: '🌞',
        advice: 'Your positive energy is contagious! Keep it up!'
      },
      {
        emoji: '✨',
        advice: 'Great to see you feeling so good! Try to maintain this vibe.'
      }
    ];

    const sadResponses: Response[] = [
      {
        emoji: '😔',
        advice: 'I understand this is tough. Try doing something you enjoy or talk to someone you trust.'
      },
      {
        emoji: '😢',
        advice: 'It\'s okay to feel down sometimes. Remember, this too shall pass.'
      },
      {
        emoji: '💔',
        advice: 'Take some time for self-care today. You deserve to feel better.'
      }
    ];

    const angryResponses: Response[] = [
      {
        emoji: '😡',
        advice: 'Take a deep breath and try to identify what\'s causing your frustration. Sometimes writing it down helps.'
      },
      {
        emoji: '😤',
        advice: 'I understand you\'re feeling angry. Try to take a moment to process your emotions.'
      },
      {
        emoji: '🤬',
        advice: 'When you\'re ready, try to express what\'s bothering you in a healthy way.'
      }
    ];

    const stressedResponses: Response[] = [
      {
        emoji: '😟',
        advice: 'Take a break and practice some relaxation techniques. Deep breathing can help calm your mind.'
      },
      {
        emoji: '💫',
        advice: 'Stress can be overwhelming. Try to break your tasks into smaller, manageable pieces.'
      },
      {
        emoji: '💭',
        advice: 'When you\'re feeling stressed, try to prioritize what\'s most important.'
      }
    ];

    const mixedResponses: Response[] = [
      {
        emoji: '🤔',
        advice: 'I see you have mixed feelings. It might be helpful to explore what\'s going on in your mind.'
      },
      {
        emoji: '💭',
        advice: 'Mixed emotions are normal. Try to identify what you\'re feeling.'
      },
      {
        emoji: '💭',
        advice: 'It\'s okay to feel more than one thing at once. Take some time to process.'
      }
    ];

    // Determine mood category and return random response
    if (moodText.includes('happy') || moodText.includes('joy') || moodText.includes('excited')) {
      return getRandomResponse(happyResponses);
    } else if (moodText.includes('sad') || moodText.includes('down') || moodText.includes('upset')) {
      return getRandomResponse(sadResponses);
    } else if (moodText.includes('angry') || moodText.includes('frustrated') || moodText.includes('annoyed')) {
      return getRandomResponse(angryResponses);
    } else if (moodText.includes('stressed') || moodText.includes('anxious') || moodText.includes('worried')) {
      return getRandomResponse(stressedResponses);
    } else {
      return getRandomResponse(mixedResponses);
    }
  }
};
