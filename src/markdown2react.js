import CommonMark from 'commonmark';
import CommonMarkReactRenderer from 'commonmark-react-renderer';

const parser = new CommonMark.Parser(),
      renderer = new CommonMarkReactRenderer();

export default function markdown2react(md) {
  return renderer.render(parser.parse(md));
}
