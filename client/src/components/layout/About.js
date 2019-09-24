import React from 'react';
import { useMediaPredicate } from 'react-media-hook';
const About = () => {
  const biggerThan700 = useMediaPredicate('(min-width: 700px)');
  return (
    <div className='about-section'>
      <div className='container'>
        <div className='header'>
          <div className='left'>
            <h1>What is IDEATOSHARE</h1>
            <p>
              IdeaToshare is a community of changemakers, creators, developers
              or anyone where individuals can share their thoughts about the
              world. Whether it’s a problem or anything you want to see in our
              world. Share, discuss, create !!!
            </p>
          </div>

          {biggerThan700 && (
            <div className='right'>
              <img src='images/community.svg' alt='community' />
            </div>
          )}
        </div>
        {biggerThan700 && (
          <div className='look-down'>
            <i className='fas fa-chevron-down fa-2x'></i>
            <i className='fas fa-chevron-down fa-2x relative'></i>
          </div>
        )}

        <div className='for-you'>
          <h2>Is IDEATOSHARE right for you?</h2>

          <div>
            <p>• Are you a creator who is looking for an idea for a project?</p>
            <p>• Do you have ideas and look for someone to join your team?</p>
            <p>
              • Do you just want to see a better world and share your ideas?
            </p>
          </div>
        </div>
        <div className='how-to'>
          <h2>How does it work</h2>
          <div className='row1'>
            <div className='post-your-thought'>
              <img src='images/post.svg' alt='post' />
              <h3>Post your thoughts</h3>
              <p>
                Casually share your thoughts about problem or ideas things in
                your daily life.
              </p>
            </div>

            <div className='discuss'>
              <img src='images/discuss.svg' alt='discuss' />
              <h3>Discuss with others</h3>
              <p>
                Discuss with others in the community and see whether you can
                tackle these problem or make these ideas come tre. Maybe someone
                already solved your problem, maybe it is the novel idea?
              </p>
            </div>

            <div className='help'>
              <img src='images/help.svg' alt='help' />
              <h3>Ask for help</h3>
              <p>
                If you cannot achieve these alone, maybe you can ask others who
                sympathize to what you are doing.v
              </p>
            </div>
          </div>

          <div className='row2'>
            <div className='update'>
              <img src='images/update.svg' alt='update' />
              <h3>Update the status</h3>
              <p>
                Update the status of your thoughts Are you taklig it? Is it
                already solved by somehow? Are anyone working on thse problem
              </p>
            </div>

            <div className='facebook'>
              <img src='images/facebook.svg' alt='facebook' />
              <h3>Join facebook group</h3>
              <p>
                Connect with others more closely and be part of the community.
              </p>
            </div>

            <div className='tackle'>
              <img src='/images/tackle.svg' alt='tackle' />
              <h3>Make it happen</h3>
              <p>
                Try to solve the problem of make your ideas come true !
                Challenge yourself. Let see what you can do to chagne the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
