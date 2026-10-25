/** Renders `**phrase**` markers in content strings as emphasized text. */
export const Highlight = ({ text, marker = false }: { text: string; marker?: boolean }) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
      i % 2 ? (
        <strong
          key={i}
          className={`font-medium text-zinc-900 dark:text-zinc-100 ${
            // marker: highlighter stroke under the lower part of the phrase
            marker ? "bg-[linear-gradient(transparent_62%,rgba(59,130,246,0.35)_62%)] box-decoration-clone" : ""
          }`}
        >
          {part}
        </strong>
      ) : (
        part
      )
    )}
  </>
);
