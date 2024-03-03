import TextLabel from '@/components/ui/TextLabel.tsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import React, {HTMLAttributes} from 'react';
import {ObsidianCallout} from 'lib';

type CalloutRenderAreaProps = {
  text: string;
  options: {
    type: string;
    color: string;
    backgroundColor: string;
  };
};

const CalloutRenderArea: React.FC<CalloutRenderAreaProps> = ({
  text,
  options,
}) => {
  const {type, color, backgroundColor} = options;
  const components = {
    h1: (props: HTMLAttributes<HTMLElement>) => (
      <h1 className="text-2xl font-bold" {...props} />
    ),
    p: (props: HTMLAttributes<HTMLElement>) => (
      <p className="whitespace-pre-line" {...props} />
    ),
    blockquote: (props: HTMLAttributes<HTMLElement>) => (
      <ObsidianCallout
        {...props}
        options={{
          [type]: {
            color,
            backgroundColor,
          },
        }}
      />
    ),
  };

  return (
    <div>
      <TextLabel>Callout will be rendered here</TextLabel>
      <div className="min-h-64 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 mt-2 p-3 bg-gray-50 sm:h-[calc(100svh_-_12.25rem)] overflow-y-scroll">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={components}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CalloutRenderArea;
