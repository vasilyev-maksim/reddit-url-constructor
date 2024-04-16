# URL examples

- https://www.reddit.com/r/teachinginjapan/comments/1bnbryh/how_to_politely_tell_me_eikawa_manager_to_give_me/
- https://www.reddit.com/r/japanlife/comments/1bneev5/neighborhood_young_man_tosses_23_cigarette_butts/en/?bot=true
- /r/japanlife/comments/1bneev5/neighborhood_young_man_tosses_23_cigarette_butts/en/?bot=true
- reddit-service-shreddit.v-maksim-vasilyev.snoo.dev
- https://reddit-service-shreddit.14326.shreddit.staging.snoo.dev

# Segmets

https://www.reddit.com - domain
/r/japanlife/comments/1bneev5/neighborhood_young_man_tosses_23_cigarette_butts - post id
/en - lang
?bot=true - query params

### Domain / Host

- Can be both shreddit, reddit, snoodev (specific for each developer), and staging (specific for each PR).
- staging: create link based on provided PR number. Should store provided values history for reuse, not to type twice the same value.
- snoodev should be most complecated option: We need to know dev's name in order to personal create link => We need to ask and store the name. Maybe the same mechanism as staging. (reddit-service-shreddit.v-maksim-vasilyev.snoo.dev)

### post id

- Just an input, but with validation

### lang

- free input + history for reuse

### query params

- bot
- experiments

# TODO

[] input validation
[] Drag segments from another url
[] Input without leading "https://" should be valid (https by default)
[] Intro/user guide
[] feature request form
