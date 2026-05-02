import React from 'react';

export default function AboutPage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-page pb-section-gap flex-1 w-full py-20 lg:py-32 flex flex-col items-center">
      <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mb-stack-lg text-center">About Us</h1>
      <div className="max-w-3xl w-full text-center">
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
          Our mission is to democratize IELTS preparation by leveraging advanced AI technology. We believe everyone deserves a clear, personalized path to achieving their target band, regardless of their background or current English level.
        </p>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          With IELTS AI Pro, we aim to eliminate the guesswork and provide actionable, effective strategies tailored specifically to your needs.
        </p>
      </div>
    </main>
  );
}
