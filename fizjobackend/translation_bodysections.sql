UPDATE [FizjoDB].[dbo].[BodySections]
SET BodySectionNamePL = CASE BodySectionName
    WHEN 'neck' THEN 'szyja'
    WHEN 'deltoid' THEN 'mięśnie naramienne'
    WHEN 'head' THEN 'głowa'
    WHEN 'chest' THEN 'klatka piersiowa'
    WHEN 'biceps' THEN 'biceps'
    WHEN 'triceps' THEN 'triceps'
    WHEN 'obliques' THEN 'mięśnie skośne'
    WHEN 'abs' THEN 'mięśnie brzucha'
    WHEN 'forearm' THEN 'przedramię'
    WHEN 'hand' THEN 'dłoń'
    WHEN 'adductors' THEN 'mięśnie przywodziciele'
    WHEN 'quadriceps' THEN 'czworogłowy uda'
    WHEN 'knee' THEN 'kolano'
    WHEN 'tibialis' THEN 'piszczelowy'
    WHEN 'calves' THEN 'łydki'
    WHEN 'ankle' THEN 'kostka'
    WHEN 'foot' THEN 'stopa'
    WHEN 'trapezius' THEN 'mięsień czworoboczny'
    WHEN 'upper-back' THEN 'górna część pleców'
    WHEN 'lower-back' THEN 'dolna część pleców'
    WHEN 'gluteal' THEN 'pośladki'
    WHEN 'adductor' THEN 'przywodziciel'
    WHEN 'hamstring' THEN 'mięsień dwugłowy uda'
    ELSE BodySectionNamePL
END;

UPDATE [FizjoDB].[dbo].[BodySections]
SET BodySidePL = CASE BodySide
    WHEN 'left' THEN 'lewa'
    WHEN 'right' THEN 'prawa'
    ELSE BodySidePL 
END;
