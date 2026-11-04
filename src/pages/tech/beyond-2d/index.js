import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
  <>
    <path d="M16 14.808a25 25 0 0 0 -4 -.312c-1.439 0 -2.796 .113 -4 .312" />
    <path d="M21 17.439c0 1.148 -2.034 2.142 -4.997 2.625l-.003 -10.439c2.965 -.482 5 -1.477 5 -2.625v-.064c0 -1.622 -4.03 -2.936 -9 -2.936s-9 1.314 -9 2.936c0 1.148 2.035 2.142 5 2.624l-.003 10.44c-2.963 -.483 -4.997 -1.477 -4.997 -2.625" />
    <path d="M3 6.936v10.439" />
    <path d="M21 6.936v10.439" />
  </>
);

export default function Beyond2D() {
  return (
    <ProjectHome
      techUrl="/tech/beyond-2d"
      icon={ICON}
      accent="#8355c7"
      description="Describes 5G-MAG's Beyond 2D Video Experiences work and its Beyond 2D Evaluation Framework testbed for benchmarking stereoscopic, multi-view, depth, and point-cloud video formats."
      analysisHref="/tech/beyond-2d/overview"
      standardsHref="/standards/beyond-2d"
      softwareHref="/testbeds/beyond-2d/"
      softwareIsTestbed
      why={
        <>
          <p className={styles.whyMattersBody}>
            It benchmarks encoding, streaming and rendering pipelines for these formats, alongside the related 3GPP study.
          </p>
        </>
      }
    >
      <p>
        5G-MAG work on evaluating video formats beyond flat 2D, such as stereoscopic, multi-view plus depth, point clouds and
        dynamic meshes.
      </p>
      <p>
        It is part of the <Link to="/tech/v3c">Volumetric Video</Link> area: Beyond 2D looks at how to evaluate the formats that
        sit alongside and lead into V3C volumetric video, so the two topics are closely related. Its software is the Beyond 2D
        Evaluation Framework testbed.
      </p>
    </ProjectHome>
  );
}
