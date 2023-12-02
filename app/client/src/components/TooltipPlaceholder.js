   <Box
                justifyContent="center"
                alignItems="center"
      >

        <Tooltip 
            title={
              <p className="smallText">
                Every time you reach a <u>named opening position</u>, you collect a "stamp"! You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for the King's Pawn Game, the King's Knight Opening, the King's Knight Opening: Normal Variation, the Ruy Lopez, and whatever subsequent variation of the Ruy Lopez you end up in.
              </p>
            } 
            enterTouchDelay={0}
            arrow
            placement="right"
            sx={{
              '.MuiTooltip-tooltip': {
                border: '1px solid',
              },  
            }}
          >
            <span className='tooltip-text'>
                  <span className='dotted-underline'>What are "chess opening stamps"</span>&nbsp;
                  <HelpIcon color="primary" />
            </span> 
          </Tooltip>
        </Box>